# 🚀 Full Stack Generative & Agentic AI with Python

> A hands-on learning repository exploring modern AI patterns including LLM integration, RAG systems, LangGraph workflows, and chain-of-thought reasoning.

[![Course](https://img.shields.io/badge/Udemy-Course-purple?style=for-the-badge&logo=udemy)](https://www.udemy.com/course/full-stack-ai-with-python)
[![Python](https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python)](https://python.org)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Learning Modules](#learning-modules)
- [Tech Stack](#tech-stack)
- [Resources](#resources)

---

## Overview

This repository contains my learning experiments and code samples from exploring generative AI and agentic patterns. It covers a wide range of topics from basic LLM integration to advanced concepts like RAG (Retrieval Augmented Generation) and LangGraph workflows.

> ⚠️ **Note:** This is a learning repository. Code may be experimental or incomplete as it reflects my learning journey.

---

## Prerequisites

Before running the examples, ensure you have the following installed:

### Required

| Tool | Version | Purpose |
|------|---------|---------|
| [Python](https://python.org) | 3.10+ | Core runtime for Python examples |
| [Node.js](https://nodejs.org) | 18+ | Runtime for JavaScript examples |
| [Ollama](https://ollama.ai) | Latest | Local LLM inference server |

### Optional (for specific modules)

| Tool | Purpose |
|------|---------|
| [Docker](https://docker.com) | Running Qdrant vector database |
| [Qdrant](https://qdrant.tech) | Vector database for RAG examples |
| [Gemini API Key](https://aistudio.google.com/app/apikey) | Google Gemini examples |

### Recommended Ollama Models

```bash
# Chat models
ollama pull qwen2.5:14b
ollama pull gemma3:27b
ollama pull qwen3:30b

# Vision models
ollama pull qwen3-vl:2b

# Embedding models
ollama pull bge-m3

# Coding models
ollama pull qwen3-coder
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sangleshubham/Learn-generative-Agentic-AI.git
cd Learn-generative-Agentic-AI
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Install Python Dependencies

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 4. Start Ollama

```bash
ollama serve
```

### 5. Start Qdrant (for RAG examples)

```bash
docker compose -f 11-rag-qdrant-python/docker-compose.yml up -d
```

---

## Project Structure

```
agentic-generative-ai-course/
├── 01-ollama-fastapi/           # FastAPI + Ollama integration
├── 02-hugging-face-transformers/# HuggingFace Transformers pipeline
├── 03-chain-of-thought-agent/   # CoT agent with tool calling
├── 04-ollama-nodejs-agent/      # Node.js agent implementation
├── 05-multi-modal-vision/       # Vision/image understanding
├── 06-langgraph-nodejs/         # LangGraph with Node.js
├── 07-langgraph-python/         # LangGraph with Python
├── 08-gemini-few-shot-prompting/# Gemini + few-shot prompting
├── 09-chain-of-thought/         # Basic CoT prompting
├── 10-token-encoding/           # Token encoding/decoding
├── 11-rag-qdrant-python/        # RAG with Qdrant (Python)
├── 12-rag-qdrant-nodejs/        # RAG with Qdrant (Node.js)
├── 13-RAG-project-file-search-engine/# RAG File Search Engine
├── .env.example                 # Environment configuration template
├── requirements.txt             # Python dependencies
└── README.md                    # This file
```

---

## Learning Modules

### 🔹 01 - Ollama + FastAPI
Basic LLM chat API using FastAPI and Ollama client.
- **Tech:** Python, FastAPI, Ollama
- **Concepts:** REST API, chat completions

### 🔹 02 - HuggingFace Transformers
Using HuggingFace pipelines for multimodal inference.
- **Tech:** Python, Transformers, Gemma-3
- **Concepts:** Image-text-to-text pipeline

### 🔹 03 - Chain-of-Thought Agent
AI agent using CoT prompting with tool calling capabilities.
- **Tech:** Python, OpenAI-compatible API
- **Concepts:** ReAct pattern, function calling, structured output

### 🔹 04 - Ollama Node.js Agent
Interactive agent implementation in Node.js with Zod schema validation.
- **Tech:** Node.js, OpenAI SDK, Zod
- **Concepts:** Schema validation, system command execution

### 🔹 05 - Multi-Modal Vision
Image understanding using vision language models.
- **Tech:** Node.js, OpenAI SDK
- **Concepts:** Base64 image encoding, vision models

### 🔹 06 - LangGraph (Node.js)
LangGraph workflow exploration in Node.js.
- **Tech:** Node.js, LangGraph
- **Concepts:** State graphs, graph workflows

### 🔹 07 - LangGraph (Python)
State machines and conditional routing with LangGraph.
- **Tech:** Python, LangGraph, LangChain
- **Concepts:** StateGraph, conditional edges, node chaining

### 🔹 08 - Gemini Few-Shot Prompting
Using Gemini API with OpenAI SDK and few-shot examples.
- **Tech:** Python, Gemini API
- **Concepts:** Few-shot learning, structured prompts

### 🔹 09 - Chain-of-Thought
Basic chain-of-thought reasoning patterns.
- **Tech:** Python, Ollama/Gemini
- **Concepts:** CoT prompting, JSON structured output

### 🔹 10 - Token Encoding
Understanding tokenization using tiktoken.
- **Tech:** Python, tiktoken
- **Concepts:** Token encoding/decoding, token counting

### 🔹 11 - RAG with Qdrant (Python)
Complete RAG pipeline using Qdrant vector database.
- **Tech:** Python, LangChain, Qdrant, Ollama
- **Concepts:** PDF loading, text splitting, embeddings, similarity search

### 🔹 12 - RAG with Qdrant (Node.js)
RAG implementation in Node.js with EPUB/PDF support.
- **Tech:** Node.js, LangChain.js, Qdrant
- **Concepts:** Document loaders, vector stores, RAG queries

### 🔹 13 - RAG Project File Search Engine
RAG-based search engine for querying file contents using local LLMs.
- **Tech:** Node.js, LangChain, Qdrant, Ollama
- **Concepts:** RAG, Vector Search, File Ingestion, CLI Interface

---

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Languages** | Python 3.10+, Node.js 18+ |
| **LLM Providers** | Ollama (local), Google Gemini |
| **Frameworks** | FastAPI, LangChain, LangGraph |
| **Vector Database** | Qdrant |
| **Embeddings** | BGE-M3 (via Ollama) |
| **Validation** | Pydantic, Zod |

---

## Resources

- 📚 [Udemy Course](https://www.udemy.com/course/full-stack-ai-with-python)
- 🦙 [Ollama Documentation](https://ollama.ai)
- 🔗 [LangChain Documentation](https://python.langchain.com)
- 📊 [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- 🗄️ [Qdrant Documentation](https://qdrant.tech/documentation/)

---

<p align="center">
  <sub>Made with ❤️ while learning AI</sub>
</p>
