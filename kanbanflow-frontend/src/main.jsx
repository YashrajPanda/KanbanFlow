import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    // Removing strict mode to avoid some dnd issues, though hello-pangea is better
    <App />
)
