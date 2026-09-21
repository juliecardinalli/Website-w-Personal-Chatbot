import { Send, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const starterPrompts = [
  "What are you proud of?",
  "How do you use AI?",
  "Why solutions engineering?",
];

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "agent",
      content: "Hi, I am Julie's personal AI. Ask me about her work, projects, background, or point of view.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  const sendMessage = async (promptOverride) => {
    const prompt = (promptOverride ?? input).trim();
    if (!prompt || loading) return;

    setMessages((previous) => [...previous, { role: "user", content: prompt }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://julie-agent-worker.juliecardinalli.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`);
      }

      const data = await response.json();
      setMessages((previous) => [
        ...previous,
        {
          role: "agent",
          content: data.answer || "I do not have that answer yet. Try asking about Julie's work, projects, or background.",
        },
      ]);
    } catch (error) {
      console.error("Error fetching Julie chatbot response:", error);
      setMessages((previous) => [
        ...previous,
        {
          role: "agent",
          content: "I cannot reach Julie's AI right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div>
          <span>Julie AI</span>
          <h3>Ask me anything.</h3>
        </div>
        <Sparkles size={22} aria-hidden="true" />
      </div>

      <div className="prompt-row" aria-label="Suggested prompts">
        {starterPrompts.map((prompt) => (
          <button type="button" className="prompt-chip" key={prompt} onClick={() => sendMessage(prompt)} disabled={loading}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-box" aria-live="polite">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {loading && <div className="message agent loading-message">Thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form
        className="input-form"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <label className="sr-only" htmlFor="chat-input">Ask Julie AI a question</label>
        <input
          id="chat-input"
          ref={inputRef}
          type="text"
          placeholder="Ask about work, AI, or Berkeley"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit" className="send-button" disabled={!canSend} aria-label="Send message">
          <Send size={18} aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
