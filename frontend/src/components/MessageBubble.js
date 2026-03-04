import React from "react";
import "./AIAssistance.css";

export default function MessageBubble({ msg, aiSpeaking }) {

    const isAI = msg.role === "ai";

    return (
        <div className={`message-row ${isAI ? "ai" : "user"}`}>
            {isAI && (
                <img
                    className="chat-avatar"
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712035.png"
                    alt="AI"
                />
            )}
            <div className={`message-bubble ${isAI ? "ai-bubble" : "user-bubble"}`}>
                {msg.text}
                {isAI && aiSpeaking && (
                    <div className="voice-wave">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </div>
        </div>
    );
}