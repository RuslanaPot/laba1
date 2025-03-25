import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddMaterial from './pages/AddMaterial';
import AddTest from './pages/AddTest';
import MaterialDetail from './pages/MaterialDetail';
import TestDetail from './pages/TestDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-material" element={<AddMaterial />} />
        <Route path="/add-test" element={<AddTest />} />
        <Route path="/material/:id" element={<MaterialDetail />} />
        <Route path="/test/:id" element={<TestDetail />} />
      </Routes>
    </Router>
  );
};

export default App;