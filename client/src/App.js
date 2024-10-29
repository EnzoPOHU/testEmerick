import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Auth from './Auth';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<LandingPage />} />
                <Route path="/" element={<Auth />} />
            </Routes>
        </Router>
    );
}

export default App;
