import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# Load env variables
# load_dotenv()
load_dotenv(dotenv_path="backend/.env")

# Create FastAPI app
app = FastAPI()

# allow React connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("Loaded Key:", GROQ_API_KEY)

# Configure Groq client
client = OpenAI(
    api_key=f"{GROQ_API_KEY}",
    base_url="https://api.groq.com/openai/v1"
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"message": "AI Server Running 🚀"}


@app.post("/chat")
def chat(req: ChatRequest):

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "system",
                "content": "You are a helpful futuristic AI assistant."
            },
            {
                "role": "user",
                "content": req.message
            }
        ],
        temperature=0.7,
        max_tokens=400
    )

    answer = response.choices[0].message.content

    return {"answer": answer}