import { ollamaClient, EMBEDINGMODEL } from '../config.js';

export async function getTextEmbedding(texts) {
    if (!Array.isArray(texts)) texts = [texts];

    return await ollamaClient.embed({
        model: EMBEDINGMODEL,
        input: texts,
        dimensions: 768
    }).then(({ embeddings }) => embeddings);
}
