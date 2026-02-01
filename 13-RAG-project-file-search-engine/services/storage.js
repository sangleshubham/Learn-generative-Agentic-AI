import { qdrantClient, COLLECTION } from '../config.js';
import { getTextEmbedding } from './embeddings.js';

export async function ensureCollection() {
    const { exists } = await qdrantClient.collectionExists(COLLECTION);
    if (!exists) {
        const collection = await qdrantClient.createCollection(COLLECTION, {
            vectors: {
                size: 768,
                distance: "Cosine"
            }
        });
        console.log(`${collection ? "Collection Created Successfully" : "Failed to create collection"}`);
        return true; // Indicates we just created it
    }
    return false; // Existed
}

export async function storeDocuments(texts) {
    const embeddings = await getTextEmbedding(texts);

    const vectorPoints = embeddings.map((embedding, index) => {
        return {
            id: crypto.randomUUID(),
            vector: embedding,
            payload: {
                content: texts[index]
            }
        };
    });

    await qdrantClient.upsert(COLLECTION, {
        points: vectorPoints
    });

    console.log("Embeddings added to database.");
}

export async function searchContext(query) {
    const [queryEmbedding] = await getTextEmbedding(query);

    const vectorContext = await qdrantClient.query(COLLECTION, {
        query: queryEmbedding,
        with_payload: true
    });

    return vectorContext.points.map((vector) => vector.payload.content).join("\n\n");
}
