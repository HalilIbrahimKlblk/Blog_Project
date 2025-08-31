import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import Admin from './pages/Admin/Admin';
import Portföy from './pages/Portfolio/Portfolio';
import MainLayout from './layouts/MainLayout';
import EmptyLayout from './layouts/EmptyLayout';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Ana sayfa - Navbar ve Footer var */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/About" element={<MainLayout><About /></MainLayout>} />
          <Route path="/Portföy" element={<MainLayout><Portföy /></MainLayout>} />
          {/* 404 sayfası - Navbar ve Footer yok */}
          <Route path="*" element={<EmptyLayout><NotFound /></EmptyLayout>} />
          <Route path="/Admin" element={<EmptyLayout><Admin /></EmptyLayout>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;