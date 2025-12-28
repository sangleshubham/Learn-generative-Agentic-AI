import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OllamaEmbeddings } from '@langchain/ollama'
import { QdrantVectorStore } from '@langchain/qdrant'

const filePath = "./book.pdf"

// Create a loader

// Load PDF
const pdfDocument = await new PDFLoader(filePath).load()

// split the text
const documents = await new RecursiveCharacterTextSplitter(
    {
        chunkSize: 1000,
        chunkOverlap: 400
    }
).splitDocuments(pdfDocument)

// Create a embeding model
const embedingModel = await new OllamaEmbeddings(
    {
        model: "bge-m3",
        base_url: "localhost:11434",
        num_ctx: 8192
    }
)

console.log("Model Loaded")

// Connect to Qdrant. 
await QdrantVectorStore.fromDocuments(
    documents,
    embedingModel,
    {
        url: "http://localhost:6333",
        collectionName: "book-node"
    }
)

console.log("Embeddings generated successfully")
