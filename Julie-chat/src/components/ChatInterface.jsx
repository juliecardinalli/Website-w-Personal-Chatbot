import { useState, useRef, useEffect } from "react";

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userInput = input;
    setMessages([...messages, { sender: "user", text: userInput }]);
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
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="h-80 overflow-y-auto mb-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <div className={msg.sender === "user" ? "bg-blue-200 inline-block px-3 py-2 rounded" : "bg-gray-200 inline-block px-3 py-2 rounded"}>
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && <div className="text-sm italic text-gray-500">Julie is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Ask me anything..."
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}

export default ChatInterface;











