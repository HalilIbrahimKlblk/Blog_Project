import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const sidebarRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        const currentPath = location.pathname;
        const basePath = currentPath.startsWith('/admin') ? '/admin' : '';
        navigate(`${basePath}${path}`);
    };

    // Dışarı tıklayınca sidebar'ın kapanması
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };

        if (sidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarOpen, setSidebarOpen]);

    return (
        <aside
            className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
            ref={sidebarRef}
        >
            <div className="sidebar-logo" onClick={() => handleNavigation('')} style={{ cursor: 'pointer' }}>
                <img className="sidebar-img" src="../img/8.svg"alt="Logo" />
            </div>

            <ul className="sidebar-menu">
                <li onClick={() => handleNavigation('/dashboard')}>
                    <span className="material-symbols-outlined">home</span>
                    <span className="sidebar-menu-text">Dashboard</span>
                </li>

                <li onClick={() => setDropdownOpen(!isDropdownOpen)} className="sidebar-dropdown-toggle">
                    <span className="material-symbols-outlined">description</span>
                    <span className="sidebar-menu-text">İçerik</span>
                    <span className={`material-symbols-outlined arrow ${isDropdownOpen ? 'open' : ''}`}>
                        expand_more
                    </span>
                </li>

                {/* Alt Menü */}
                <ul className={`sidebar-submenu ${isDropdownOpen ? 'show' : ''}`}>
                    <li onClick={() => handleNavigation('/content')}>📝 İçerik Yönetimi</li>
                    <li onClick={() => handleNavigation('/projects')}>🗂️ Projelerim</li>
                    <li onClick={() => handleNavigation('/blog')}>💻 Yazılım Blogum</li>
                    <li onClick={() => handleNavigation('/education')}>🎓 Eğitim Bilgilerim</li>
                    <li onClick={() => handleNavigation('/skills')}>💡 Becerilerim</li>
                </ul>

                <li onClick={() => handleNavigation('/users')}>
                    <span className="material-symbols-outlined">group</span>
                    <span className="sidebar-menu-text">Kullanıcılar</span>
                </li>

                <li onClick={() => handleNavigation('/settings')}>
                    <span className="material-symbols-outlined">settings</span>
                    <span className="sidebar-menu-text">Ayarlar</span>
                </li>

                <li onClick={() => {
                    alert('Başarı ile çıkış yapıldı.');
                    navigate('/');
                }}>
                    <span className="material-symbols-outlined">logout</span>
                    <span className="sidebar-menu-text">Çıkış</span>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;