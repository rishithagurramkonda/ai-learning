import React, { useState } from "react";
import { askAI } from "../services/aiService";
import "./AIAssistance.css";

function AIAssistance() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {

    if (!input) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages([...messages, userMessage]);

    const aiReply = await askAI(input);

    const aiMessage = {
      sender: "ai",
      text: aiReply
    };

    setMessages(prev => [...prev, aiMessage]);

    setInput("");

  };

  return (

    <div className="ai-container">

      <div className="header">
        SmartAI
      </div>

      <div className="title">
        Hello! How can I assist you today?
      </div>

      <div className="chat-box">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : "ai-message"
            }
          >

            {msg.text}

          </div>

        ))}

      </div>

      <div className="input-area">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
        />

        <button onClick={handleSend}>
          Send
        </button>

      </div>

    </div>

  );

}

export default AIAssistance;