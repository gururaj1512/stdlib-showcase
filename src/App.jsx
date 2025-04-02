import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import NdArray from './pages/NdArray.jsx';
import Math from './pages/Math.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ndarray" element={<NdArray />} />
            <Route path="/math" element={<Math />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;