import { EPubLoader } from "@langchain/community/document_loaders/fs/epub"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { OllamaEmbeddings } from '@langchain/ollama'
import { QdrantVectorStore } from '@langchain/qdrant'

const epubFile = "./book.epub"

// Load EPUB
const epubDocument = await new EPubLoader(epubFile).load()

// split the text
let documents = await new RecursiveCharacterTextSplitter(
    {
        chunkSize: 1000,
        chunkOverlap: 200
    }
).splitDocuments(epubDocument)

// Create a embeding model
const embedingModel = await new OllamaEmbeddings(
    {
        model: "bge-m3",
        base_url: "localhost:11434",
        num_ctx: 8192
    }
)

console.log("Model Loaded")

// Time taken to generate embeddings
const startTime = Date.now()
// Connect to Qdrant. 
await QdrantVectorStore.fromDocuments(
    documents,
    embedingModel,
    {
        url: "http://localhost:6333",
        collectionName: "book-epub"
    }
)
const endTime = Date.now()
const timeTaken = (endTime - startTime) / 1000
console.log(`Time taken to generate embeddings: ${timeTaken} seconds`)
console.log("Embeddings generated successfully")
