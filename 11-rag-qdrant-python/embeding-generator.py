from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_qdrant import QdrantVectorStore
from langchain_ollama import OllamaEmbeddings

path = "./book.pdf"
documents = PyPDFLoader(path).load()

print("Documents loaded successfully")

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=400
)

chunks = text_splitter.split_documents(documents)

print("Documents split successfully")

embedingModel = OllamaEmbeddings(
    base_url="http://localhost:11434",
    model="bge-m3",
    num_ctx=8192 # Context size, This model does support 8192 tokens. 
)

print("Embeddings model loaded successfully")

vectorStore = QdrantVectorStore.from_documents(
    documents=chunks,
    embedding=embedingModel,
    url="http://localhost:6333",
    collection_name="book"
)

print("Embeddings generated successfully")

