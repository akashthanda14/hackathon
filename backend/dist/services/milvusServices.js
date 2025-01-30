"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initailzeService = exports.milvusCreds = exports.collectionName = exports.client = void 0;
const milvus2_sdk_node_1 = require("@zilliz/milvus2-sdk-node");
const address = "http://localhost:19530";
exports.client = new milvus2_sdk_node_1.MilvusClient(address);
exports.collectionName = "my_new2";
// mlivus context check 
exports.milvusCreds = {
    dbcheck: false,
    collectionCheck: false
};
const dbName = "my_db";
const schema = {
    collection_name: exports.collectionName,
    fields: [
        {
            name: 'id',
            data_type: milvus2_sdk_node_1.DataType.Int64,
            is_primary_key: true,
            autoID: true,
        },
        {
            name: 'vector_field',
            data_type: milvus2_sdk_node_1.DataType.FloatVector,
            dim: 1536,
        },
    ],
};
const initailzeService = async () => {
    try {
        const databases = await exports.client.listDatabases();
        const Objname = databases.db_names;
        const name = Objname.filter((item) => item === dbName);
        if (!name) {
            await exports.client.createDatabase({ db_name: dbName });
            exports.milvusCreds.dbcheck = true;
            console.log("Database created successfully");
        }
        console.log("Database already exists");
    }
    catch (e) {
        console.log("Error creating the database", e);
    }
    await exports.client.use({ db_name: dbName });
    try {
        if (!exports.milvusCreds.collectionCheck) {
            const collections = await exports.client.list_collections();
            if (!collections.data.some((col) => col.name === exports.collectionName)) {
                await exports.client.createCollection(schema);
                console.log("Collection created successfully.");
            }
        }
    }
    catch (e) {
        console.error("Error initializing Milvus:", e);
    }
};
exports.initailzeService = initailzeService;
