from langchain_ollama import OllamaEmbeddings
from langchain_qdrant import QdrantVectorStore
from openai import OpenAI

query = input("Enter Query: ")

# intitialize embeding model

embedingModel = OllamaEmbeddings(
    model="bge-m3"
)
qdrantClient = QdrantVectorStore.from_existing_collection(
    collection_name="book",
    embedding=embedingModel,
    url="http://localhost:6333"
)

documents = qdrantClient.similarity_search(query=query)

context = ""

for document in documents:
    context+= f"Page Content: {document.page_content}\nPage Number: {document.metadata['page_label']}\nFile Location: {document.metadata['source']}\n\n"

systemPrompt = f""" 
You are a AI Assistant which helps user with their queries using context provided. 
Always give page numbers and other related info about the query.

Context: 
{context}
"""

# print(systemPrompt)

messages = [
    {"role": "system", "content" : systemPrompt},
    {"role": "user", "content" : query}
]


client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"
)

response = client.chat.completions.create(
    model="qwen3:30b",
    messages=messages,
)


print(response.choices[0].message.content)

    


