import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/home';
import Login from './login/Login';
import Register from './login/Register';
import './App.css';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
