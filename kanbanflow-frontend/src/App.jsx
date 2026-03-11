import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BoardPage from './pages/BoardPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen text-slate-100 font-sans">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/board/:id" element={<BoardPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
