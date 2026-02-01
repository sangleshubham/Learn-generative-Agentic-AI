import { OllamaEmbeddings } from '@langchain/ollama'
import { QdrantVectorStore } from '@langchain/qdrant'
import readline from 'readline'
import { OpenAI } from "openai";

// Get Imput from user
const getUserInput = () => {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question('User: ', (userInput) => {
            rl.close()
            resolve(userInput)
        })
    })
}

const userQuery = await getUserInput()

// Create a embeding model

const embedingModel = new OllamaEmbeddings(
    {
        baseUrl: "http://localhost:11434",
        model: "bge-m3"
    }
)

// Get data from vector DB and add it as a context to LLM. 

const vectorDB = await QdrantVectorStore.fromExistingCollection(embedingModel, {
    url: "http://localhost:6333",
    collectionName: "book-epub"
})

let context = await vectorDB.similaritySearch(userQuery)

console.log(`Context Found: ${context.length}`)

context = ((context) => {
    return context.map((doc) => `Page Content: ${doc.pageContent}\n\nPage Number: ${doc.metadata.page_label}`).join("\n\n")
})(context)

// System Prompt

const systemPropmpt = `
You are a RAG AI agent which helps user to answer their questions. The context is provided to you already. 
Context: ${context}
`

const messages = [
    { role: "system", content: systemPropmpt },
    { role: "user", content: userQuery }
]


const aiClient = new OpenAI({
    baseURL: "http://localhost:11434/v1",
    apiKey: "ollama"
})


const reponse = await aiClient.chat.completions.create(
    {
        messages: messages,
        model: "gpt-oss:20b"
    }
)

console.log("AI Response: ")
console.log(reponse.choices[0].message.content)

