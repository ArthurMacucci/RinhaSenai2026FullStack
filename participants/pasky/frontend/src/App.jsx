import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import TransactionDetail from './pages/TransactionDetail';
import './styles/App.css';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/transaction/:id" element={<TransactionDetail />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 Rinha | Gateway</p>
        </footer>
      </div>
    </Router>
  );
}