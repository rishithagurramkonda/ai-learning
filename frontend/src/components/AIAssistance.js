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

        try {

            const response = await askAI(input);

            const aiMessage = {
                role: "ai",
                text: response
            };

            setMessages((prev) => [...prev, aiMessage]);

        } catch (err) {

            setMessages((prev) => [
                ...prev,
                { role: "ai", text: "Something went wrong." }
            ]);

        }

        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    const startVoiceInput = () => {

        const recognition =
            new window.webkitSpeechRecognition() ||
            new window.SpeechRecognition();

        recognition.onresult = (event) => {

            const transcript = event.results[0][0].transcript;

            setInput(transcript);

        };

        recognition.start();
    };

    return (

        <div className="ai-wrapper">

            <div className="ai-container">

                <div className="ai-header">

                    <div className={`ai-avatar ${loading ? "avatar-active" : ""}`}>
                        🤖
                    </div>

                    <h2>AI Assistant</h2>

                </div>

                <div className="chat-area">

                    {messages.map((msg, index) => (
                        <MessageBubble key={index} msg={msg} />
                    ))}

                    {loading && <TypingIndicator />}

                    <div ref={messagesEndRef} />

                </div>

                <div className="input-area">

                    <button
                        className="voice-btn"
                        onClick={startVoiceInput}
                    >
                        🎤
                    </button>

                    <input
                        type="text"
                        placeholder="Ask anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />

                    <button
                        className="send-btn"
                        onClick={sendMessage}
                    >
                        ➤
                    </button>

                </div>

            </div>

        </div>
    );
}