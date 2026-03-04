import React from "react";

export default function MessageBubble({ msg }) {

    return (
        <div className={`message ${msg.role}`}>
            <div className="bubble">
                {msg.text}
            </div>
        </div>
    );
}