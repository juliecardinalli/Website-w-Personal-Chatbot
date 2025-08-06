import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://julie-agent-worker.juliecardinalli.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const botMessage = { role: "agent", content: data.answer || "No response from agent." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error fetching:", err);
      setMessages((prev) => [...prev, { role: "agent", content: "⚠️ Error getting response" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with Julie</div>

      <div className="chat-box" style={{ display: "flex", flexDirection: "column" }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message agent">...</div>}
      </div>

      <div className="input-form">
        <input
          type="text"
          placeholder="Ask Julie anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}







