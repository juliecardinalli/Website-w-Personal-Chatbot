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
    <div className="flex flex-col max-w-3xl mx-auto mt-10 bg-white shadow-2xl rounded-3xl p-8 border border-gray-200">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6 tracking-tight">
        Ask Julie Anything 💬
      </h1>

      <div className="flex flex-col gap-4 overflow-y-auto h-[30rem] px-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-md px-5 py-3 rounded-2xl text-sm leading-relaxed transition-all duration-300 shadow-md ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-xs font-semibold mb-1 text-gray-300 uppercase tracking-wide">
                {msg.sender === "user" ? "You" : "Julie"}
              </p>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic animate-pulse">Julie is thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-6 gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={2}
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none shadow-sm"
          placeholder="Type your question..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;








