import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WordPage from './pages/WordPage';
import SettingsPage from './pages/SettingsPage';
import MistakesPage from './pages/MistakesPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/word" element={<WordPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/mistakes" element={<MistakesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
