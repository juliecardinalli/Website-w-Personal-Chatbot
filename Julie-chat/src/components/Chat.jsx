import { Send, WandSparkles } from "lucide-react";
import { useMemo, useRef, useState } from "react";

const starterPrompts = [
  "What are you proud of professionally?",
  "How do you think about AI?",
  "What is a fun fact about you?",
];

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "agent",
      content:
        "Hi, I am Julie's personal AI. Ask me about her work, projects, background, or the extremely specific joy of knowing every country flag.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const sendMessage = async (promptOverride) => {
    const prompt = (promptOverride ?? input).trim();
    if (!prompt || loading) return;

    const userMessage = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://julie-agent-worker.juliecardinalli.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Request failed with ${res.status}`);
      }

      const data = await res.json();
      const botMessage = {
        role: "agent",
        content: data.answer || "I am not sure how to answer that yet, but I can tell you about Julie's work, projects, or interests.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error fetching Julie chatbot response:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content:
            "I could not reach Julie's AI worker right now. The site is still here, but the chat needs the Cloudflare Worker to be deployed and reachable.",
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
          <h3>Ask a better question, get a better story.</h3>
        </div>
        <WandSparkles size={24} aria-hidden="true" />
      </div>

      <div className="prompt-row" aria-label="Suggested prompts">
        {starterPrompts.map((prompt) => (
          <button className="prompt-chip" key={prompt} onClick={() => sendMessage(prompt)} disabled={loading}>
            {prompt}
          </button>
        ))}
      </div>

      <div className="chat-box" aria-live="polite">
        {messages.map((msg, idx) => (
          <div key={`${msg.role}-${idx}`} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="message agent loading-message">Thinking...</div>}
      </div>

      <div className="input-form">
        <input
          ref={inputRef}
          type="text"
          placeholder="Ask Julie about work, AI, Berkeley, hobbies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button className="send-button" onClick={() => sendMessage()} disabled={!canSend} aria-label="Send message">
          <Send size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
