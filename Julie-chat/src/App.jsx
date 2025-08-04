import { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";

function App() {
  const [tab, setTab] = useState("chat");

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 font-sans">
      <nav className="flex justify-center space-x-4 mb-6">
        <button onClick={() => setTab("chat")} className={tab === "chat" ? "font-bold text-blue-600" : ""}>Chat</button>
        <button onClick={() => setTab("how")} className={tab === "how" ? "font-bold text-blue-600" : ""}>How it Works</button>
        <button onClick={() => setTab("about")} className={tab === "about" ? "font-bold text-blue-600" : ""}>About Me</button>
      </nav>

      <main className="max-w-2xl mx-auto">
        {tab === "chat" && <ChatInterface />}
        {tab === "how" && <HowItWorks />}
        {tab === "about" && <About />}
      </main>
    </div>
  );
}

export default App;

