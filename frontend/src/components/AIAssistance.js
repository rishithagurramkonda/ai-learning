import React, { useState, useRef, useEffect } from "react";
import { askAI } from "../services/aiService";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import "./AIAssistance.css";

export default function AIAssistant() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const messagesEndRef = useRef(null);
    const speechRef = useRef(null);

    const scrollBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollBottom();
    }, [messages]);

    // 🎤 START VOICE
    const speakText = (text) => {

        if (!text) return;

        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;

        speech.onstart = () => {
            setIsSpeaking(true);
        };

        speech.onend = () => {
            setIsSpeaking(false);
        };

        speechRef.current = speech;

        window.speechSynthesis.speak(speech);
    };

    // ⏹ STOP VOICE
    const stopVoice = () => {

        window.speechSynthesis.cancel();
        setIsSpeaking(false);

    };

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

            // 🔊 AI speaks automatically
            speakText(response);

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

    // 🎤 USER VOICE INPUT
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

                    <div className={`ai-avatar ${isSpeaking ? "avatar-active" : ""}`}>
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

                <div className="voice-wave">

                    {isSpeaking && (
                        <div className="wave-container">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    )}

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

                    <button
                        className="stop-btn"
                        onClick={stopVoice}
                    >
                        ⏹
                    </button>

                </div>

            </div>

        </div>
    );
}