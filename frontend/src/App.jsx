import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Navigate eklendi
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Reset from './pages/Reset/Reset';
import Login from './pages/Login/Login';
import MainLayout from './layouts/MainLayout';
import EmptyLayout from './layouts/EmptyLayout';
import AdminLayout from './layouts/AdminLayout'; 
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import Content from './pages/Admin/Content/Content';
import Projects from './pages/Admin/Projects/Projects';
import Blog from './pages/Admin/Blog/Blog';
import Education from './pages/Admin/Education/Education';
import Skills from './pages/Admin/Skills/Skills';
import Calendar from './pages/Admin/Calendar/Calendar';
import Settings from './pages/Admin/Settings/Settings';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("auth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ================= PUBLIC ROTALAR ================= */}
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/reset-password" element={<EmptyLayout><Reset /></EmptyLayout>} />
          <Route path="/login" element={<EmptyLayout><Login /></EmptyLayout>} />

          {/* ================= ADMIN ROTALARI ================= */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="content" element={<Content />} />
            <Route path="projects" element={<Projects />} />
            <Route path="blog" element={<Blog />} />
            <Route path="education" element={<Education />} />
            <Route path="skills" element={<Skills />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Eşleşmeyen tüm yollar (*) için 404 sayfası */}
          <Route path="*" element={<EmptyLayout><NotFound /></EmptyLayout>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;