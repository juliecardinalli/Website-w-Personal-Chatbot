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
    <div className="flex flex-col max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6 border">
      <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">Chat with Julie ✨</h1>

      <div className="flex flex-col space-y-4 overflow-y-auto h-[28rem] px-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-3 rounded-2xl text-sm leading-relaxed shadow ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-pink-100 text-gray-800 rounded-bl-none"
              }`}
            >
              <strong className="block mb-1 text-xs uppercase tracking-wide">
                {msg.sender === "user" ? "You" : "Julie"}
              </strong>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 italic animate-pulse">Julie is thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-6 space-x-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={2}
          className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
          placeholder="Ask me anything..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;








