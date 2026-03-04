import axios from "axios";
const API_URL = "http://127.0.0.1:8000/chat";
export const sendMessageToAI = async (message) => {

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: message
    })
  });

  const data = await response.json();

  return data.answer;
};


export const askAI = async (message) => {

  const response = await axios.post(
    "http://localhost:5000/ask-ai",
    {
      message: message
    }
  );

  return response.data.reply;

};