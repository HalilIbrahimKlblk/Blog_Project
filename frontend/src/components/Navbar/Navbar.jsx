import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <a href="/"><i className="fas fa-home fa-1x" style={{ marginRight: '10px' }}></i>Ana Sayfa</a>
      </div>
      <button className="navbar-toggle" onClick={handleToggle} aria-label="Menüyü Aç/Kapat">
        <span className="navbar-toggle-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div className={`navbar-right${menuOpen ? ' open' : ''}`}>
        <a href="/About">Hakkımda</a>
        <div
          className="navbar-dropdown"
          onClick={handleDropdownToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a className='Portfolio'>Portföy</a>
          {dropdownOpen && (
            <div className="dropdown-column">
              <a href="/Portfolio">Projelerim</a>
              <a href="/Portfolio">Sertifikalarım</a>
              <a href="/Portfolio">CV</a>
            </div>
          )}
        </div>
        <a href="/Events">Etkinlikler</a>
        <a href="/Portfolio">İletişim</a>
      </div>
    </nav>
  );
};

export default Navbar;