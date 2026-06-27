import React, { useState } from 'react';
import './Project_Card.css';
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import API_URL from '../../config/config.js';

// Props kısmına 'id' eklendi
const Project_Card = ({ id, img, title, description, skills, date, links = {}, likeSum }) => {

    const imagePath = `/img/${img}`;

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likeSum);

    const handleLike = async (e) => {
        // Tıklamanın diğer elementlere yayılmasını engeller
        e.stopPropagation();

        const newLikedState = !liked;
        const newLikeCount = newLikedState ? likeCount + 1 : likeCount - 1;

        // 1. Kullanıcıyı bekletmemek için arayüzü anında güncelle (Optimistic UI)
        setLiked(newLikedState);
        setLikeCount(newLikeCount);

        // 2. Backend'e sadece beğeni isteği gönder
        try {
            // Yeni yazdığın temiz endpoint'e sadece ID'yi parametre olarak yolluyoruz.
            // Body (veri gövdesi) veya header göndermemize gerek kalmadı!
            const response = await fetch(API_URL.PROJECT.LIKE(id), {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error('Beğeni kaydedilirken sunucu hatası oluştu');
            }
            
        } catch (error) {
            console.error("Beğeni kaydedilemedi:", error);
            // 3. Sunucuda bir hata olursa (örn: internet koparsa) arayüzü eski haline döndür
            setLiked(!newLikedState);
            setLikeCount(liked ? likeCount + 1 : likeCount - 1);
        }
    };

    const icons = {
        github: { icon: <FaGithub />, url: links.github },
        instagram: { icon: <FaInstagram />, url: links.instagram },
        linkedin: { icon: <FaLinkedin />, url: links.linkedin }
    };

    return (
        <div className="card">
            <div className="card-image">
                <img src={imagePath} alt={title || "Event"} />
            </div>
            <div className="card-content">
                <h5 className="card-title">{title}</h5>
                <p className="card-description">{description}</p>
                <div className="card-divider">
                    <div className="card-skill">
                        {skills && skills.map((skill, index) => (
                            <span key={index} className="skill-badge">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <div className="social-icons">
                        {Object.keys(icons).map((key) =>
                            icons[key].url ? (
                                <a
                                    key={key}
                                    href={icons[key].url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon"
                                >
                                    {icons[key].icon}
                                </a>
                            ) : null
                        )}
                    </div>
                </div>
            </div>
            <div className="card-footer-row">
                {/* onClick buraya bağlı */}
                <div className="like-section" onClick={handleLike}>
                    <button className="like-btn">
                        {liked ? (
                            <AiFillHeart className="heart-icon filled" />
                        ) : (
                            <AiOutlineHeart className="heart-icon" />
                        )}
                    </button>
                    <span className="like-count">{likeCount}</span>
                </div>
                <p className="card-date">{date}</p>
            </div>
        </div>
    );
};

export default Project_Card;