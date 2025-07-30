import React, { useState } from "react";
import axios from "axios";
import "../styles/ChatBot.css";
import { FaMicrophone } from "react-icons/fa";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const TextChatbot = () => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const handleSubmit = async (customPrompt = null) => {
    const input = customPrompt || prompt;
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5001/generate_response", { prompt: input });
      const botMessage = { role: "bot", content: res.data.text };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "Failed to generate response. Please try again." }]);
    }

    setPrompt("");
    setLoading(false);
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setListening(false);
      handleSubmit(transcript); // Send transcript as prompt
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
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
          
          <button
            className={`mic-button ${listening ? "listening" : ""}`}
            onClick={startListening}
            title="Speak"
          >
            <FaMicrophone />
          </button>

          <button className="send-button" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextChatbot;
