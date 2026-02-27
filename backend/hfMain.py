import os
import requests
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Get Hugging Face API key
HF_API_KEY = os.getenv("HF_API_KEY")

# Hugging Face model endpoint
HF_MODEL_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base"

# Request headers
headers = {
    "Authorization": f"Bearer {HF_API_KEY}"
}


# Request model
class ChatRequest(BaseModel):
    message: str


# Helper function to format prompt
def chat_prompt(user_message: str):
    return f"""
You are a helpful AI assistant.
Answer clearly and professionally.

User: {user_message}
Assistant:
"""


# Chat API
@app.post("/chat")
def chat(request: ChatRequest):
    try:
        prompt = chat_prompt(request.message)

        payload = {
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": 200,
                "temperature": 0.7,
                "return_full_text": False
            }
        }

        response = requests.post(HF_MODEL_URL, headers=headers, json=payload)
#         response = requests.post(
#     HF_MODEL_URL,
#     headers=headers,
#     json=payload,
#     timeout=30   # prevents infinite loading
# )

        if response.status_code != 200:
            return {
                "error": "Hugging Face API Error",
                "details": response.json()
            }

        result = response.json()

        # Extract generated text
        if isinstance(result, list) and "generated_text" in result[0]:
            answer = result[0]["generated_text"]
        else:
            answer = result

        return {
            "question": request.message,
            "answer": answer
        }

    except Exception as e:
        return {
            "error": str(e)
        }


# Root route
@app.get("/")
def root():
    return {"message": "Hugging Face AI Backend Running 🚀"}