import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register'; // Імпортуємо нову сторінку
import AdminPanel from './AdminPanel';
import PatientCabinet from './PatientCabinet';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Додаємо маршрут */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cabinet" element={<PatientCabinet />} />
      </Routes>
    </Router>
  );
}

export default App;