import express ,{Request,Response} from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import fs from "fs"
import { gen } from "../embedding/embd";
import { client,collectionName} from "../services/milvusServices";
import { PrismaClient } from "@prisma/client";
import { IndexType } from "@zilliz/milvus2-sdk-node";
import { chunk } from "../chunking/chunk";

const upload = multer({ dest: 'uploads/' })
const prisma=new PrismaClient();


const pdfrouter=express.Router();

            
pdfrouter.post("/pdfUp",upload.single("pdf"),(async (req: Request, res: Response) => {
      try {
        if (!req.file?.path || !req.file) {
            res.status(400).send("No file uploaded");
            return;
        }
  
        const pdf = fs.readFileSync(req.file.path);
        const data = await pdfParse(pdf);
        
        const spiltArr= data.text.split("\n");
        const textArray = spiltArr.filter(line => typeof line === 'string' && line.trim().length > 0);

        const maxChunkSize = 400; 
        const overlap = 100; 
        const textChunks = chunk({textArray, maxChunkSize, overlap});
  
        let checkGen=false;

       
        const embeddingResponse = await gen(textChunks);
        
        if(!embeddingResponse||!embeddingResponse.data)
        {
          throw new Error("Failed to generate the embeddings");
        }
        checkGen=true;

        if (embeddingResponse&&embeddingResponse.data) {
            const fieldsData=embeddingResponse.data.map((item)=>({
              vector_field:item.embedding,
            }))

            const milvusResponse=await client.insert({
              collection_name:collectionName,
              fields_data:fieldsData
            })  

            const vectorId=milvusResponse.IDs;

            await client.loadCollection({
              collection_name: collectionName,
            })
            
            if ('int_id' in vectorId && vectorId.int_id) {
              const idArray = vectorId.int_id.data;
              
              const docId=`doc_${Date.now()}`;
              
              const pgInsertres=await prisma.fileDta.create({
                data:{
                  docId:docId,
                  embeddingGenerated:checkGen,
                }
              });

              const indexInfo = await client.describeIndex({
                collection_name: collectionName, 
                field_name: "vector_field", 
              });
              
              if (!indexInfo.status || indexInfo.status.error_code !== 'Success') {
                console.error(`No index exists for the collection. Reason: ${indexInfo.status.reason}`);
              } else {
                console.log("Index details:", indexInfo);
              }

              const chunksData = textChunks.map((chunk, index) => ({
                fileId:pgInsertres.id,
                chunk: chunk,
                vectorId: idArray[index].toString(),
              }));

              await prisma.fileMetaData.createMany({
                data:chunksData
              })

              await client.createIndex({
                collection_name: collectionName,
                field_name: "vector_field", 
                index_type: IndexType.IVF_FLAT,
                metric_type: "L2",
                params: { nlist: 1024 }, 
              });

              console.log("File all the operations are being done !");
            } else {
              console.error("error in id");
            }
        }
      } catch (e) {
        console.error("Error generating embeddings ", e);
      }
      
    }) 
);

export default pdfrouter;