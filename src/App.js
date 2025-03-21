import './App.css';
import "./Register.css"
import "./CreateBanner.css"
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';
import CreateBanner from './CreateBanner';
import Autorisation from './Autorisation'

function AppContent() {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            navigate('/create-banner');
        }
    }, [navigate]);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/autorisation" element={<Autorisation />} />
                <Route path="/create-banner" element={<CreateBanner />} />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;