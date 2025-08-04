import { useState, useRef, useEffect } from "react";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    const userInput = input.trim();
    if (!userInput || loading) return;

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://julie-agent-worker.juliecardinalli.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="w-full max-w-2xl bg-white/70 backdrop-blur-lg shadow-xl border border-gray-200 rounded-3xl p-6 flex flex-col h-[85vh]">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">Chat with Julie 🤖</h1>

      <div className="flex-1 overflow-y-auto px-2 space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-sm px-5 py-3 rounded-xl shadow-sm text-sm transition-all duration-300 whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-bl-none"
              }`}
            >
              <span className="block text-xs font-medium mb-1 text-gray-400 uppercase">
                {msg.sender === "user" ? "You" : "Julie"}
              </span>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic animate-pulse">Julie is thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={2}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm bg-white"
          placeholder="Ask me anything..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;









