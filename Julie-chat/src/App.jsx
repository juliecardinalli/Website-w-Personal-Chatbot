import { useState } from "react";
import Chat from "./components/Chat";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";

function App() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div>
      <nav className="nav-bar">
        <button className={activeTab === "chat" ? "active" : ""} onClick={() => setActiveTab("chat")}>
          Chat
        </button>
        <button className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>
          About Me
        </button>
        <button className={activeTab === "how" ? "active" : ""} onClick={() => setActiveTab("how")}>
          How This Was Made
        </button>
      </nav>

      <div className="tab-content">
        {activeTab === "chat" && <Chat />}
        {activeTab === "about" && <About />}
        {activeTab === "how" && <HowItWorks />}
      </div>
    </div>
  );
}

export default App;



