import React, { useState } from 'react';
import './Event_Card.css';
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Event_Card = ({ img, title, description, date, links = {}, likeSum }) => {

    const imagePath = `/img/${img}`;

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likeSum);

    const handleLike = () => {
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
        setLiked(!liked);
    };

    const icons = {
        github: { icon: <FaGithub />, url: links.github },
        instagram: { icon: <FaInstagram />, url: links.instagram },
        linkedin: { icon: <FaLinkedin />, url: links.linkedin }
    };

    return (
        <div className="card">
            <div className="card-image">
                <img src={imagePath} alt={title|| "Event"} />
            </div>
            <div className="card-content">
                <h5 className="card-title">{title}</h5>
                <p className="card-description">{description}</p>
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
            <div className="card-footer-row">
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

export default Event_Card;
