import React, { useState, useEffect } from 'react'
import './Home.css'
import Education from '../../components/Education/Education'
import Skill from '../../components/Skill/Skill'
import Project_Card from '../../components/Project_Card/Project_Card';
import Blog_Card from '../../components/Blog_Card/Blog_Card';
import Contact from '../../components/Contact/Contact';
import API_URL, { IMAGE_URL } from '../../config/config.js';

const Home = () => {

    // Admin verileri için State'ler
    const [admin, setAdmin] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    const [adminError, setAdminError] = useState(null);

    // Education verileri için State'ler
    const [educations, setEducations] = useState([]);
    const [isEducationsLoading, setIsEducationsLoading] = useState(true);
    const [educationsError, setEducationsError] = useState(null);

    // Skill verileri için State'ler
    const [skills, setSkills] = useState([]);
    const [isSkillsLoading, setIsSkillsLoading] = useState(true);
    const [skillsError, setSkillsError] = useState(null);

    // Blog verileri için State'ler
    const [blogs, setBlogs] = useState([]);
    const [isBlogsLoading, setIsBlogsLoading] = useState(true);
    const [blogsError, setBlogsError] = useState(null);

    // Project verileri için State'ler
    const [projects, setProjects] = useState([]);
    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [projectsError, setProjectsError] = useState(null);

    // Ekran genişliğine göre sütun sayısını belirleyecek State (Masonry Layout için)
    const [columnCount, setColumnCount] = useState(3);

    // Tarihi "Gün Ay Yıl" formatına çeviren fonksiyon (Örn: 15 Nisan 2026)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        // Eğer geçersiz bir tarih formatı gelirse gelen string'i olduğu gibi bırakır
        if (isNaN(date.getTime())) return dateString;

        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Ekran boyutunu dinleyip sütun sayısını ayarlayan useEffect
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setColumnCount(1);
            else if (window.innerWidth < 992) setColumnCount(2);
            else setColumnCount(3);
        };
        
        handleResize(); // Sayfa ilk yüklendiğinde çalıştır
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Sayfa yüklendiğinde Admin verilerini çek
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await fetch(API_URL.ADMIN.PROFILE);
                if (!response.ok) {
                    throw new Error("Admin bilgileri yüklenemedi.");
                }
                const data = await response.json();
                setAdmin(data);
            } catch (error) {
                setAdminError(error.message);
                console.error("Admin fetch error:", error);
            } finally {
                setIsAdminLoading(false);
            }
        };

        fetchAdmin();
    }, []);

    // Sayfa yüklendiğinde Education verilerini çek
    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const response = await fetch(API_URL.EDUCATION.GET_ALL);
                if (!response.ok) {
                    throw new Error("Eğitim bilgileri yüklenemedi.");
                }
                const data = await response.json();
                setEducations(data);
            } catch (error) {
                setEducationsError(error.message);
                console.error("Education fetch error:", error);
            } finally {
                setIsEducationsLoading(false);
            }
        };

        fetchEducations();
    }, []);

    // Sayfa yüklendiğinde Skill verilerini çek
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(API_URL.SKILL.GET_ALL);
                if (!response.ok) {
                    throw new Error("Beceriler yüklenemedi.");
                }
                const data = await response.json();
                setSkills(data);
            } catch (error) {
                setSkillsError(error.message);
                console.error("Skill fetch error:", error);
            } finally {
                setIsSkillsLoading(false);
            }
        };

        fetchSkills();
    }, []);

    // Sayfa yüklendiğinde Blog verilerini çek
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(API_URL.BLOG.GET_ALL);
                if (!response.ok) {
                    throw new Error("Blog yazıları yüklenemedi.");
                }
                const data = await response.json();

                // Verileri tarihe göre yeniden eskiye (descending) sıralıyoruz
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

                setBlogs(sortedData);
            } catch (error) {
                setBlogsError(error.message);
                console.error("Blog fetch error:", error);
            } finally {
                setIsBlogsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Sayfa yüklendiğinde Project verilerini çek
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(API_URL.PROJECT.GET_ALL);
                if (!response.ok) {
                    throw new Error("Projeler yüklenemedi.");
                }
                const data = await response.json();
                
                // Projeleri tarihe göre yeniden eskiye sıralıyoruz
                const sortedProjects = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setProjects(sortedProjects);
                
            } catch (error) {
                setProjectsError(error.message);
                console.error("Project fetch error:", error);
            } finally {
                setIsProjectsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Projeleri sütunlara soldan sağa sırayla dağıtma işlemi
    const projectColumns = Array.from({ length: columnCount }, () => []);
    projects.forEach((project, index) => {
        projectColumns[index % columnCount].push(project);
    });

    return (
        <div>
            <section className="hero">
                <div className="container hero-content">
                    <h1>Merhaba, Ben <span className="gradient-text"> {admin?.name}</span></h1>
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
                    {isAdminLoading ? (
                        <p style={{ color: "white", width: "100%", textAlign: "center" }}>Yükleniyor...</p>
                    ) : adminError ? (
                        <p style={{ color: "red", width: "100%", textAlign: "center" }}>{adminError}</p>
                    ) : (
                        <>
                            <div className="about-left">
                                {admin?.img && (
                                    <img 
                                        src={`${IMAGE_URL}${admin.img}`} 
                                        alt={`${admin?.name || ''} ${admin?.surname || ''}`} 
                                        className="profile-pic" 
                                        width={300} 
                                    />
                                )}
                            </div>
                            <div className="about-right">
                                <div className="about-text">
                                    <h1 className="about-name">{`${admin?.name} ${admin?.surname}`}</h1>
                                    <h3 className="about-role">
                                        {admin?.sections && admin.sections.map((section, index) => (
                                            <React.Fragment key={index}>
                                                <span>{section}</span>
                                                {index < admin.sections.length - 1 && <span className="dot">•</span>}
                                            </React.Fragment>
                                        ))}
                                    </h3>
                                </div>
                                <p>{admin?.about}</p>
                                <div className="cv-box">
                                    <a href="../../public/Halil_İbrahim_Kalabalik.pdf" className="cv-btn" download target="_blank" rel="noreferrer"><i className="fas fa-download"></i> Download CV</a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='container'>
                <div className='about-flex-content'>
                    <div className='about-flex-item'>
                        <h2 className='about-h2'>Eğitim Hayatım</h2>
                        <ul className='timeline'>
                            {isEducationsLoading ? (
                                <p style={{ color: "white" }}>Yükleniyor...</p>
                            ) : educationsError ? (
                                <p style={{ color: "red" }}>{educationsError}</p>
                            ) : (
                                educations.map((edu) => (
                                    <Education
                                        key={edu.id}
                                        year={edu.date}
                                        title={edu.title}
                                        section={edu.section}
                                    />
                                ))
                            )}
                        </ul>
                    </div>

                    <div className='about-flex-item'>
                        <h2 className='about-h2'>Becerilerim</h2>
                        <div className='skills-container'>
                            {isSkillsLoading ? (
                                <p style={{ color: "white" }}>Yükleniyor...</p>
                            ) : skillsError ? (
                                <p style={{ color: "red" }}>{skillsError}</p>
                            ) : (
                                skills.map((skill) => (
                                    <div key={skill.id}>
                                        <Skill
                                            img={skill.img}
                                            title={skill.title}
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="info-cards">
                    {/* Linkler ve yazılar veritabanından çekiliyor */}
                    <a className='card-link' href={`mailto:${admin?.email}`}>
                        <div className="info-card">
                            <i className="fas fa-envelope"></i>
                            <div>
                                <h4>E-Mail</h4>
                            </div>
                        </div>
                    </a>
                    <a className='card-link' href="#">
                        <div className="info-card">
                            <i className="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>{admin?.location}</h4>
                            </div>
                        </div>
                    </a>
                    <a className='card-link' href={admin?.github} target="_blank" rel="noreferrer">
                        <div className="info-card">
                            <i className="fab fa-github"></i>
                            <div>
                                <h4>GitHub</h4>
                            </div>
                        </div>
                    </a>
                    <a className='card-link' href={admin?.linkedln} target="_blank" rel="noreferrer">
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
                {isProjectsLoading ? (
                    <p style={{ color: "white" }}>Projeler yükleniyor...</p>
                ) : projectsError ? (
                    <p style={{ color: "red" }}>{projectsError}</p>
                ) : (
                    <div className="masonry-flex-container">
                        {projectColumns.map((col, colIndex) => (
                            <div className="masonry-col" key={colIndex}>
                                {col.map((project) => (
                                    <div className="masonry-item" key={project.id}>
                                        <Project_Card
                                            id={project.id}
                                            img={project.img}
                                            title={project.title}
                                            description={project.description}
                                            skills={project.skills}
                                            date={formatDate(project.date)}
                                            links={project.socialMedia}
                                            likeSum={project.heart}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <h2 className="section-title" id='blog'><span>Blog</span></h2>
            <div className="container">
                <div>
                    {isBlogsLoading ? (
                        <p style={{ color: "white" }}>Blog yazıları yükleniyor...</p>
                    ) : blogsError ? (
                        <p style={{ color: "red" }}>{blogsError}</p>
                    ) : (
                        blogs.map((blog) => (
                            <div className="masonry-item" key={blog.id}>
                                <Blog_Card
                                    title={blog.title}
                                    content={blog.description} 
                                    date={formatDate(blog.date)}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>

            <h2 className="section-title" id='contact'><span>İletişim</span></h2>
            <div className="container">
                <Contact />
            </div>
        </div>
    )
}

export default Home;