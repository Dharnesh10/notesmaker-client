import React, { useState, useEffect } from 'react';

// Check for SpeechRecognition compatibility
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInput = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const startListening = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Voice Input</h2>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Talking'}
      </button>
      <p><strong>Transcript:</strong> {transcript}</p>
    </div>
  );
};

export default VoiceInput;
