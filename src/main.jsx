import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Loginapp from './loginapp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Loginapp/>
  </StrictMode>,
)
