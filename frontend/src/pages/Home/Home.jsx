import React from 'react'
import './Home.css'
import Education from '../../components/Education/Education'
import Skill from '../../components/Skill/Skill'
import Project_Card from '../../components/Project_Card/Project_Card';
import Blog_Card from '../../components/Blog_Card/Blog_Card';
import Contact from '../../components/Contact/Contact';
import { skill_datas, education_datas, work_datas, blog_datas } from '../../data/data'


const Home = () => {
    return (
        <div>
            <section className="hero">
                <div className="container hero-content">
                    <h1>Merhaba, Ben <span className="gradient-text"> Halil İbrahim</span></h1>
                    <p>Frontend, backend ve mobil teknolojiler alanında çalışan; kullanıcı odaklı, yenilikçi ve sürdürülebilir çözümler geliştirmeye odaklanan bir yazılım geliştiricisiyim.</p>
                    <div className="hero-btns">
                        <button
                            className="btn"
                            onClick={() =>
                                document
                                    .getElementById("projects")
                                    .scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            Projelerimi Gör
                        </button>
                        <button
                            className="btn btn-outline"
                            onClick={() =>
                                document
                                    .getElementById("contact")
                                    .scrollIntoView({ behavior: "smooth" })
                            }
                        >
                            İletişime Geç
                        </button>
                    </div>
                </div>
            </section>
            <h2 className="section-title" id='about'><span>Hakkımda</span></h2>
            <div className="container">
                <div className="about-content">
                    <div className="about-left">
                        <img src="../../public/img/profile.jpg" alt="Halil İbrahim Kalabalık" className="profile-pic" width={300} />
                    </div>
                    <div className="about-right">
                        <div className="about-text">
                            <h1 className="about-name">Halil İbrahim Kalabalık</h1>
                            <h3 className="about-role">
                                <span>Frontend</span>
                                <span className="dot">•</span>
                                <span>Backend</span>
                                <span className="dot">•</span>
                                <span>Mobile</span>
                            </h3>
                        </div>
                        <p>Mersin Üniversitesi, Bilişim Sistemleri ve Teknolojileri son sınıf öğrencisiyim. Frontend, backend ve mobil teknolojiler alanında çalışan; kullanıcı odaklı, yenilikçi ve sürdürülebilir çözümler geliştirmeye odaklanan bir yazılım geliştiricisiyim. Öğrendiğim teknolojiler sayesinde modern kullanıcı arayüzleri tasarlıyor; ölçeklenebilir backend çözümleri geliştiriyorum. Çeşitli <b>teknofest</b> ve <b>tübitak</b> projelerinde görev alarak uçtan uca yazılım geliştirme ve donanım entegrasyonu konularında tecrübe edindim. Sektörün metodolojilerine hâkim bir takım oyuncusu olarak, teknolojiyle katma değer sağlayan projeler üretmeyi hedefliyorum.</p>
                        <div className="cv-box">
                            <a href="../../public/Halil_İbrahim_Kalabalik.pdf" className="cv-btn" download target="_blank"><i className="fas fa-download"></i> Download CV</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='about-flex-content'>
                    <div className='about-flex-item'>
                        <h2 className='about-h2'>Eğitim Hayatım</h2>
                        <ul className='timeline'>
                            {[...education_datas].map(([id, data]) => (
                                <Education
                                    key={id}
                                    year={data.year}
                                    title={data.title}
                                    section={data.section}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className='about-flex-item'>
                        <h2 className='about-h2'>Becerilerim</h2>
                        <div className='skills-container'>
                            {[...skill_datas].map(([id, data]) => (
                                <div key={id}>
                                    <Skill
                                        img={data.img}
                                        title={data.title}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="info-cards">
                    <a className='card-link' href="mailto:halilkalabalik64@gmail.com">
                        <div className="info-card">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>E-Mail</h4>
                            </div>
                        </div>
                    </a>
                    <a className='card-link'>
                        <div className="info-card">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Ankara</h4>
                            </div>
                        </div>
                    </a>
                    <a className='card-link' href="https://github.com/HalilIbrahimKlblk">
                        <div className="info-card">
                            <i className="fab fa-github"></i>
                            <div>
                                <h4>GitHub</h4>
                            </div>
                        </div>
                    </a>
                    <a className='card-link' href="https://www.linkedin.com/in/halil-ibrahim-kalabalik/">
                        <div className="info-card">
                            <i className="fab fa-linkedin"></i>
                            <div>
                                <h4>LinkedIn</h4>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <h2 className="section-title" id='projects'><span>Projelerim</span></h2>
            <div className="container">
                <div className="masonry">
                    {[...work_datas].map(([id, data]) => (
                        <div className="masonry-item" key={id}>
                            <Project_Card
                                img={data.img}
                                title={data.title}
                                description={data.description}
                                skills={data.skills}
                                date={data.date}
                                links={data.links}
                                likeSum={data.likeSum}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="section-title" id='blog'><span>Blog</span></h2>
            <div className="container">
                <div>
                    {[...blog_datas].map(([id, data]) => (
                        <div className="masonry-item" key={id}>
                            <Blog_Card
                                title={data.title}
                                content={data.content}
                                date={data.date}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <h2 className="section-title" id='contact'><span>İletişim</span></h2>
            <div className="container">
                <Contact />
            </div>
        </div>
    )
}

export default Home