import React, { useState } from "react";
import { sendMessageToAI } from "../services/aiService";

function AIAssistance() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {

    if (!message) return;

    const userMsg = { role: "user", text: message };
    setChat(prev => [...prev, userMsg]);

    const userInput = message;

    setMessage("");

    const answer = await sendMessageToAI(userInput);

    const botMsg = { role: "bot", text: answer };

    setChat(prev => [...prev, botMsg]);
  };

  return (

    <div>

      <div className="chat-box">

        {chat.map((msg, index) => (

          <div key={index} className={msg.role}>
            {msg.text}
          </div>

        ))}

      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
      />

      <button onClick={handleSend}>
        Send
      </button>

    </div>

  );
}

export default AIAssistance;