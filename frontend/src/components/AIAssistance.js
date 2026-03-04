import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/aiService";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import "./AIAssistance.css";

export default function AIAssistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", text: input };

        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        const aiReply = await askAI(input);

        const aiMsg = { role: "ai", text: aiReply };

        setMessages((prev) => [...prev, aiMsg]);
        setLoading(false);
    };

    const startVoice = () => {
        const recognition =
            new window.webkitSpeechRecognition() ||
            new window.SpeechRecognition();

        recognition.onresult = (event) => {
            setInput(event.results[0][0].transcript);
        };

        recognition.start();
    };

    return (
        <div className="ai-wrapper">

            <div className="ai-card">

                <div className="ai-header">
                    <div className="ai-avatar">🤖</div>
                    <h2>AI Assistant</h2>
                </div>

                <div className="chat-area">

                    {messages.map((msg, i) => (
                        <MessageBubble key={i} msg={msg} />
                    ))}

                    {loading && <TypingIndicator />}

                    <div ref={messagesEndRef} />

                </div>

                <div className="input-area">

                    <button className="voice-btn" onClick={startVoice}>
                        🎤
                    </button>

                    <input
                        type="text"
                        placeholder="Ask AI anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    <button className="send-btn" onClick={sendMessage}>
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}