import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className='navbar'>
      <div className="navbar-left">
        <a href='/' className="logo-link">
          <img src="/img/1.svg" alt="home" />
        </a>
      </div>

      <button className={`navbar-toggle ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        <a
          href="#about"
          className='nav-link'
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")
              .scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
          }}
        >
          Hakkımda
        </a>
        <a
          href="#projects"
          className='nav-link'
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("projects")
              .scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
          }}
        >
          Projelerim
        </a>
        <a
          href="#blog"
          className='nav-link'
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("blog")
              .scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
          }}
        >
          Blog
        </a>
        <a
          href="#contact"
          className='contact-btn'
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")
              .scrollIntoView({ behavior: "smooth" });
              setMenuOpen(false);
          }}
        >
          İletişime Geç
        </a>
      </div>
    </nav>
  );
};

export default Navbar;