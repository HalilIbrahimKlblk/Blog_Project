import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar/Sidebar';
import Navbar from '../components/Admin/Navbar/Navbar';
import Footer from '../components/Admin/Footer/Footer'; 
import './AdminLayout.css';

const AdminLayout = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="admin-layout">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="main-wrapper">
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <main className="content-area">
                    <Outlet /> 
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;