import React, { useState, useEffect } from 'react';
import './Footer.css';
import API_URL from '../../config/config.js';

const Footer = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(API_URL.ADMIN.PROFILE);
        if (!response.ok) {
          throw new Error('Veri çekilirken bir sorun oluştu');
        }
        const data = await response.json();
        setAdminData(data); 
      } catch (error) {
        console.error("Footer: Admin verisi çekilemedi:", error);
      }
    };

    fetchAdminData();
  }, []); 

  return (
    <footer className="footer">
      <h5>Halil İbrahim Kalabalık</h5>
      <div className="footer-social">
        
        {adminData?.linkedln && (
          <a href={adminData.linkedln} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in fa-2x"></i>
          </a>
        )}
        
        {adminData?.instagram && (
          <a href={adminData.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        )}
        
        {adminData?.github && (
          <a href={adminData.github} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github fa-2x"></i>
          </a>
        )}
        
        {adminData?.x && (
          <a href={adminData.x} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-x-twitter fa-2x"></i>
          </a>
        )}
        
        {adminData?.youtube && (
          <a href={adminData.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        )}
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