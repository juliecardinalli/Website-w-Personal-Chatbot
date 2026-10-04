import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './islands.css'
import App from './IslandApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
