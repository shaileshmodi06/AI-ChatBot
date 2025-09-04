import React, { useState } from "react";
import './ChatBot.css'

function ChatBot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`, // keep secret
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: input }],
      }),
    });

    const data = await res.json();
    const reply = data.choices[0].message.content;

    setMessages([...messages, { user: input, bot: reply }]);
    setInput("");
  };

  return (
    <div className="p-4 chatBox">
      <div className="botProfile">BOT BA+</div>
      <div>
        {messages.map((msg, i) => (
          <div key={i}>
            <p className="userChat"><b>You:</b> {msg.user}</p>
            <p><b>Bot:</b> {msg.bot}</p>
          </div>
        ))}
      </div>
      <div className='textHolder'>
        <input
          value={input}
          className="input"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
export default ChatBot;