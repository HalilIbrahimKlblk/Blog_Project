import React, { useState, useRef, useEffect } from 'react'
import './Blog_Card.css'

const Blog_Card = ({ title = "Başlık Yok", content = "", date = "" }) => {
  const [expanded, setExpanded] = useState(false)
  const [showButton, setShowButton] = useState(false) // Butonun çıkıp çıkmayacağına karar veren state
  const cardRef = useRef(null)
  const contentRef = useRef(null) // İçeriğin fiziksel yüksekliğini ölçmek için referans

  const maxLength = 205;
  const safeContent = typeof content === 'string' ? content : "";

  // Sayfa yüklendiğinde ve veri geldiğinde yüksekliği ölçen efekt
  useEffect(() => {
    if (contentRef.current) {
      // scrollHeight: Metnin alt satırlara inen gerçek tam yüksekliği
      // clientHeight: CSS ile bizim sınırladığımız (max-height) görünen yükseklik
      const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      
      const textOnly = safeContent.replace(/<\/?[^>]+(>|$)/g, "");

      // Eğer içerik kutudan taşıyorsa (çok satır varsa) VEYA karakter sayısı sınırımızı aştıysa butonu göster
      if (isOverflowing || textOnly.length > maxLength) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
  }, [safeContent]); // İçerik her değiştiğinde yeniden hesapla

  const toggleExpand = () => {
    if (expanded && cardRef.current) {
      const yOffset = -90; 
      const y =
        cardRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
    setExpanded(!expanded);
  };

  return (
    <div 
      ref={cardRef}
      className={`blog-card ${expanded ? "expanded" : ""}`}
    >
      <div className="blog-content">
        <h3>{title}</h3>
        
        {/* İçerik kapsayıcımız: Kapalıyken her zaman clamped sınıfını alır.
            İçerik kısaysa sorun olmaz, uzunsa CSS tarafından kesilir. */}
        <div 
          ref={contentRef}
          className={`html-content-container ${!expanded ? "clamped" : ""}`}
          dangerouslySetInnerHTML={{ __html: safeContent }} 
        />

        {/* Buton sadece showButton true ise (yani taşma veya çok karakter varsa) çıkar */}
        {showButton && (
          <span 
            className="read-more"
            onClick={toggleExpand}
          >
            {expanded ? "Daha az göster ↑" : "Devamını oku →"}
          </span>
        )}
      </div>

      <p className="blog-date">{date}</p>
    </div>
  )
}

export default Blog_Card;