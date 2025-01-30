"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrompt = void 0;
const createPrompt = async (userQuery, chunks) => {
    const chunksText = chunks.map((chunk, index) => `Chunk ${index + 1}: ${chunk.chunk}`).join("\n\n");
    return `User Query: ${userQuery}\n\nDocument Chunks:\n${chunksText}\n\nPSummarize the following text into a concise and coherent summary that captures the main points, avoiding any loss of critical information. Ensure the summary is structured and easy to understand, keeping the tone [formal/informal, depending on your need]. If the content includes data, include key figures.But keep in mind that do not add your extra knowledge in this `;
};
exports.createPrompt = createPrompt;
