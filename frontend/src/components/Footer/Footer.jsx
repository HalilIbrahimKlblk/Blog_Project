import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h5>Halil İbrahim Kalabalık</h5>
      <div className="footer-social">
        <a href="https://www.linkedin.com/in/halil-ibrahim-kalabalik/">
          <i className="fab fa-linkedin-in fa-2x"></i>
        </a>
        <a href="https://www.instagram.com/halilibrahimkalbalik/">
          <i className="fab fa-instagram fa-2x"></i>
        </a>
        <a href="https://github.com/HalilIbrahimKlblk">
          <i className="fab fa-github fa-2x"></i>
        </a>
        <a href="https://x.com/halilkalbalik">
          <i className="fab fa-x-twitter fa-2x"></i>
        </a>
        <a href="https://www.youtube.com/@halilibrahimkalbalik">
          <i className="fab fa-youtube fa-2x"></i>
        </a>
      </div>
      <div className="footer-title">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("about")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Hakkımda
        </a>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("projects")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Projelerim
        </a>
        <a
          href="#blog"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("blog")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Blog
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          İletişim
        </a>
      </div>
      <div className="footer-text">
        <p> 2025 © Halil İbrahim Kalabalık | Tüm Hakları Saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;