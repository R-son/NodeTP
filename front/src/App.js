import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './Users.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
