import React, { useState } from "react";
import axios from "axios";
import "../styles/ChatBot.css"; // Ensure you have this CSS file for styling


const TextChatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5001/generate_response", { prompt });
      const botMessage = { role: "bot", content: res.data.text };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Failed to generate response. Please try again." }]);
    }
    setLoading(false);
    setPrompt("");
  };

  return (
    <div className="chat-container">
      <h1 className="chat-title">Chatbot</h1>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
        {loading && <div className="loading">typing...</div>}
      </div>
      <div className="input-container">
        <div className="input-wrapper">
          <input
            className="chat-input"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Send a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <button className="send-button" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextChatbot;
