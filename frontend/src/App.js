import React from 'react';
import logo from './logo.svg';
import './App.css';
import Hero from './components/Hero';
import Features from './components/Features';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <React.Fragment>
            <Hero />
            <Features />
          </React.Fragment>
        } />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="*" element={<h1 className="text-center py-24">Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
