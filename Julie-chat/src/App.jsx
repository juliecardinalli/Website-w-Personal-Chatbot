import { useState } from 'react'
import ChatInterface from './components/ChatInterface'
import About from './pages/About'
import HowItWorks from './pages/HowItWorks'

function App() {
  const [tab, setTab] = useState('chat')

  return (
    <div className="min-h-screen bg-white p-6 max-w-3xl mx-auto">
      <nav className="flex space-x-4 mb-6 justify-center">
        <button onClick={() => setTab('chat')} className={tab === 'chat' ? 'font-bold' : ''}>Chat</button>
        <button onClick={() => setTab('how')} className={tab === 'how' ? 'font-bold' : ''}>How it Works</button>
        <button onClick={() => setTab('about')} className={tab === 'about' ? 'font-bold' : ''}>About Me</button>
      </nav>
      {tab === 'chat' && <ChatInterface />}
      {tab === 'how' && <HowItWorks />}
      {tab === 'about' && <About />}
    </div>
  )
}

export default App
