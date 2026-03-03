import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
from backend.rag import search

# Load environment variables
load_dotenv(dotenv_path="backend/.env")

# Create FastAPI app
app = FastAPI()

# Load API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("Loaded Key:", GROQ_API_KEY)

# Configure Groq client
client = OpenAI(
    api_key=GROQ_API_KEY,
    base_url="https://api.groq.com/openai/v1"
)

# Request model
class ChatRequest(BaseModel):
    message: str


# Root endpoint
@app.get("/")
def root():
    return {"message": "Groq AI Backend Running 🚀"}


# Chat endpoint
@app.post("/chat")
def chat(request: ChatRequest):

    try:
        # 🔎 Search relevant documents from knowledge base
        relevant_docs = search(request.message)

        # Combine context
        context = "\n".join(relevant_docs)

        # Send to Groq model
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "system",
                    "content": """
You are an AI assistant.

Answer the user's question using ONLY the provided context.

If the answer is not found in the context,
say: "I could not find this information in the knowledge base."
"""
                },
                {
                    "role": "user",
                    "content": f"""
Context:
{context}

Question:
{request.message}
"""
                 }
            ],
            temperature=0.7,
            max_tokens=300
        )

        answer = response.choices[0].message.content

        return {
            "question": request.message,
            "retrieved_context": relevant_docs,
            "answer": answer
        }

    except Exception as e:
        return {"error": str(e)}