import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const [admin, setAdmin] = useState({
        name: '',
        surname: '',
        username: '',
        img: ''
    });

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:8080/blog-api/v1/admin/info',
                    {
                        // Eğer token varsa buraya ekle
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setAdmin(response.data);
            } catch (error) {
                console.error("Admin bilgisi alınamadı:", error);
            }
        };

        fetchAdmin();
    }, []);

    return (
        <header className="admin-header">
            <div className="admin-left-section">
                <button className="admin-menu-btn" onClick={toggleSidebar}>
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="admin-search-bar">
                    <span className="material-symbols-outlined admin-search-icon">search</span>
                    <input type="text" placeholder="Sayfada ara..." />
                </div>
            </div>

            <div className="admin-right-section">
                <div className="admin-icon-group">
                    <span className="material-symbols-outlined admin-nav-icon" title='Bildirimler'>
                        notifications
                    </span>
                    <span className="material-symbols-outlined admin-nav-icon" title='Mesajlar'>
                        mail
                    </span>
                    <span
                        className="material-symbols-outlined admin-nav-icon"
                        onClick={() => navigate('/login')}
                        title='Çıkış Yap'
                    >
                        logout
                    </span>
                </div>

                <div className="admin-profile">
                    <img
                        src={`/img/${admin.img}`}
                        alt="Profil"
                        className="admin-profile-pic"
                    />
                    <div className="admin-profile-info">
                        <span className="admin-profile-name"> {admin.name || "Name"} {admin.surname || "Surname"}</span>
                        <span className="admin-profile-role">{admin.username || "Username"}</span>
                    </div>
                </div>
            </div> 
        </header>
    );
};

export default Navbar;