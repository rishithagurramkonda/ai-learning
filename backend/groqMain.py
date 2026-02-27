import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# Load env variables
# load_dotenv()
load_dotenv(dotenv_path="backend/.env")

# Create FastAPI app
app = FastAPI()

# Get Groq API key
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
print("Loaded Key:", GROQ_API_KEY)

# Configure Groq client
client = OpenAI(
    api_key=f"{GROQ_API_KEY}",
    base_url="https://api.groq.com/openai/v1"
)

# Request model
class ChatRequest(BaseModel):
    message: str


@app.get("/")
def root():
    return {"message": "Groq AI Backend Running 🚀"}


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        response = client.chat.completions.create(
            # model="llama3-8b-8192",  # Fast + free
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a helpful AI assistant."},
                {"role": "user", "content": request.message}
            ],
            temperature=0.7,
            max_tokens=300
        )

        answer = response.choices[0].message.content

        return {
            "question": request.message,
            "answer": answer
        }

    except Exception as e:
        return {"error": str(e)}