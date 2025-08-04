import { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";

function App() {
  const [tab, setTab] = useState("chat");

  const renderTab = () => {
    switch (tab) {
      case "chat":
        return <ChatInterface />;
      case "how":
        return <HowItWorks />;
      case "about":
        return <About />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 text-gray-800 font-sans">
      <div className="flex flex-col items-center justify-start min-h-screen p-6 max-w-4xl mx-auto">
        <nav className="flex gap-4 mb-6 mt-4 bg-white/70 backdrop-blur-lg px-6 py-2 rounded-full shadow border border-gray-200">
          <button
            onClick={() => setTab("chat")}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              tab === "chat" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setTab("how")}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              tab === "how" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            How it Works
          </button>
          <button
            onClick={() => setTab("about")}
            className={`px-4 py-1 rounded-full text-sm font-medium transition ${
              tab === "about" ? "bg-blue-600 text-white shadow" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            About Me
          </button>
        </nav>

        <div className="w-full">{renderTab()}</div>
      </div>
    </div>
  );
}

export default App;

