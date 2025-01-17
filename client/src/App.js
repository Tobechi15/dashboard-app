import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Reg from './reg'
import Login from './login'
import Dashboard from './dashboard';


function App() {
  

  return (
    <Router>
      <div className="relative bg-slate-100">

        <Routes>
          <Route path="/adduser" element={<Reg />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
