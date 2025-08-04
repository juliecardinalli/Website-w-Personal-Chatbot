import { useState } from "react";

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! Ask me anything about Julie 😊" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    const assistantMessage = { role: "assistant", content: data.answer };
    setMessages((prev) => [...prev, assistantMessage]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="text-2xl font-bold text-center py-4 bg-white shadow">
        Ask Julie
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm ${
              msg.role === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-white"
            }`}
          >
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
              {msg.content}
            </p>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic">Thinking...</div>
        )}
      </div>

      <div className="p-4 bg-white shadow-inner">
        <div className="flex items-center space-x-2">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}








