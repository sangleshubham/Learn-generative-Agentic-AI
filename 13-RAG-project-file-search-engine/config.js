import { QdrantClient } from '@qdrant/js-client-rest';
import { Ollama } from 'ollama';

export const COLLECTION = "personal_details";
export const LLMMODEL = "mistral-nemo";
export const EMBEDINGMODEL = "qwen3-embedding:8b";

export const qdrantClient = new QdrantClient({ host: '127.0.0.1', port: 6333 });
export const ollamaClient = new Ollama({ host: "127.0.0.1:11434" });
