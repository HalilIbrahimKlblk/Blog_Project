import React, { useState, useRef } from 'react'
import './Blog_Card.css'

const Blog_Card = ({ title, content, date }) => {
  const [expanded, setExpanded] = useState(false)
  const cardRef = useRef(null)

  const maxLength = 205;
  const shortText = content.length > maxLength 
    ? content.substring(0, maxLength) + "..."
    : content

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
        <p>{expanded ? content : shortText}</p>

        {content.length > maxLength && (
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

export default Blog_Card