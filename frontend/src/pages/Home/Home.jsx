import React, { useState, useEffect } from 'react'
import './Home.css'
import Education from '../../components/Education/Education'
import Skill from '../../components/Skill/Skill'
import Project_Card from '../../components/Project_Card/Project_Card';
import Blog_Card from '../../components/Blog_Card/Blog_Card';
import Contact from '../../components/Contact/Contact';
import API_URL from '../../config/config.js';

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
    // Blog Pagination State
    const [blogPage, setBlogPage] = useState(1);
    const BLOGS_PER_PAGE = 4;

    // Project verileri için State'ler
    const [projects, setProjects] = useState([]);
    const [isProjectsLoading, setIsProjectsLoading] = useState(true);
    const [projectsError, setProjectsError] = useState(null);
    // Project Pagination State
    const [projectPage, setProjectPage] = useState(1);
    const PROJECTS_PER_PAGE = 6;

    // Ekran genişliğine göre sütun sayısını belirleyecek State (Masonry Layout için)
    const [columnCount, setColumnCount] = useState(3);

    // Tarihi "Gün Ay Yıl" formatına çeviren fonksiyon (Örn: 15 Nisan 2026)
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;

        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Sayfa değiştirildiğinde ilgili bölüme güvenli bir şekilde kaydırmak için yardımcı fonksiyon
    const scrollToSection = (id) => {
        setTimeout(() => {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };

    // Ekran boyutunu dinleyip sütun sayısını ayarlayan useEffect
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setColumnCount(1);
            else if (window.innerWidth < 992) setColumnCount(2);
            else setColumnCount(3);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Veri Çekme İşlemleri (Admin, Education, Skill, Blog, Project)
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await fetch(API_URL.ADMIN.PROFILE);
                if (!response.ok) throw new Error("Admin bilgileri yüklenemedi.");
                const data = await response.json();
                setAdmin(data);
            } catch (error) {
                setAdminError(error.message);
            } finally {
                setIsAdminLoading(false);
            }
        };
        fetchAdmin();
    }, []);

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const response = await fetch(API_URL.EDUCATION.GET_ALL);
                if (!response.ok) throw new Error("Eğitim bilgileri yüklenemedi.");
                const data = await response.json();
                setEducations(data);
            } catch (error) {
                setEducationsError(error.message);
            } finally {
                setIsEducationsLoading(false);
            }
        };
        fetchEducations();
    }, []);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(API_URL.SKILL.GET_ALL);
                if (!response.ok) throw new Error("Beceriler yüklenemedi.");
                const data = await response.json();
                setSkills(data);
            } catch (error) {
                setSkillsError(error.message);
            } finally {
                setIsSkillsLoading(false);
            }
        };
        fetchSkills();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(API_URL.BLOG.GET_ALL);
                if (!response.ok) throw new Error("Blog yazıları yüklenemedi.");
                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setBlogs(sortedData);
            } catch (error) {
                setBlogsError(error.message);
            } finally {
                setIsBlogsLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(API_URL.PROJECT.GET_ALL);
                if (!response.ok) throw new Error("Projeler yüklenemedi.");
                const data = await response.json();
                const sortedProjects = data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setProjects(sortedProjects);
            } catch (error) {
                setProjectsError(error.message);
            } finally {
                setIsProjectsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // --- TÜM VERİLERİN YÜKLENME DURUMUNU KONTROL ET ---
    const isPageLoading = isAdminLoading || isEducationsLoading || isSkillsLoading || isBlogsLoading || isProjectsLoading;

    // --- PROJE PAGINATION HESAPLAMALARI ---
    const indexOfLastProject = projectPage * PROJECTS_PER_PAGE;
    const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalProjectPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

    // Projeleri sütunlara soldan sağa sırayla dağıtma işlemi
    const projectColumns = Array.from({ length: columnCount }, () => []);
    currentProjects.forEach((project, index) => {
        projectColumns[index % columnCount].push(project);
    });

    // --- BLOG PAGINATION HESAPLAMALARI ---
    const indexOfLastBlog = blogPage * BLOGS_PER_PAGE;
    const indexOfFirstBlog = indexOfLastBlog - BLOGS_PER_PAGE;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalBlogPages = Math.ceil(blogs.length / BLOGS_PER_PAGE);

    // EĞER SAYFA YÜKLENİYORSA TAM EKRAN LOADER GÖSTER
    if (isPageLoading) {
        return (
            <div className="full-page-loader">
                <div className="loading-spinner"></div>
                <h2 className="loading-text">Portfolyo Hazırlanıyor...</h2>
            </div>
        );
    }

    return (
        <div>
            {/* HERO ALANI */}
            <section className="hero">
                <div className="container hero-content">
                    <h1>Merhaba, Ben <span className="gradient-text"> {admin?.name}</span></h1>
                    <p>Frontend, backend ve mobil teknolojiler alanında çalışan; kullanıcı odaklı, yenilikçi ve sürdürülebilir çözümler geliştirmeye odaklanan bir yazılım geliştiricisiyim.</p>
                    <div className="hero-btns">
                        <button className="btn hero-btn" onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
                            Projelerimi Gör
                        </button>
                        <button className="btn hero-btn btn-outline" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                            İletişime Geç
                        </button>
                    </div>
                </div>
            </section>

            {/* HAKKIMDA ALANI */}
            <h2 className="section-title" id='about'><span>Hakkımda</span></h2>
            <div className="container">
                <div className="about-content">
                    {adminError ? (
                        <p style={{ color: "red", width: "100%", textAlign: "center" }}>{adminError}</p>
                    ) : (
                        <>
                            <div className="about-left">
                                {admin?.img && (
                                    <img src={admin.img} alt={`${admin?.name || ''} ${admin?.surname || ''}`} className="profile-pic" width={300} />
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
                                    <a href="../../public/Halil_Ibrahim_Kalabalik.pdf" className="cv-btn" download target="_blank" rel="noreferrer"><i className="fas fa-download"></i> Download CV</a>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* MİNİMAL İSTATİSTİKLER */}
            <div className="container">
                <div className="stats-minimal-container">
                    <div className="stat-minimal-item">
                        <h3 className="stat-minimal-number">{projects.length}+</h3>
                        <p className="stat-minimal-text">PROJE</p>
                    </div>
                    <div className="stat-minimal-divider"></div>
                    <div className="stat-minimal-item">
                        <h3 className="stat-minimal-number">{skills.length}+</h3>
                        <p className="stat-minimal-text">TEKNOLOJİ</p>
                    </div>
                    <div className="stat-minimal-divider"></div>
                    <div className="stat-minimal-item">
                        <h3 className="stat-minimal-number">{blogs.length}+</h3>
                        <p className="stat-minimal-text">MAKALE</p>
                    </div>
                    <div className="stat-minimal-divider"></div>
                    <div className="stat-minimal-item">
                        <h3 className="stat-minimal-number">{educations.length}</h3>
                        <p className="stat-minimal-text">SERTİFİKA & EĞİTİM</p>
                    </div>
                </div>
            </div>

            {/* EĞİTİM VE BECERİLER */}
            <div className='container'>
                <div className='about-flex-content'>
                    <div className='about-flex-item'>
                        <h2 className='about-h2'>Eğitim Hayatım</h2>
                        <ul className='timeline'>
                            {educationsError ? (
                                <p style={{ color: "red" }}>{educationsError}</p>
                            ) : (
                                educations.map((edu) => (
                                    <Education key={edu.id} year={edu.date} title={edu.title} section={edu.section} />
                                ))
                            )}
                        </ul>
                    </div>
                    <div className='about-flex-item'>
                        <h2 className='about-h2'>Becerilerim</h2>
                        <div className='skills-container'>
                            {skillsError ? (
                                <p style={{ color: "red" }}>{skillsError}</p>
                            ) : (
                                skills.map((skill) => {
                                    return (
                                        <Skill
                                            key={skill.id}
                                            img={skill.img || ""}
                                            title={skill.title}
                                        />
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* BİLGİ KARTLARI */}
            <div className="container">
                <div className="info-cards">
                    <a className='card-link' href={`mailto:${admin?.email}`}>
                        <div className="info-card">
                            <i className="fas fa-envelope"></i>
                            <div><h4>E-Mail</h4></div>
                        </div>
                    </a>
                    <a className='card-link' href="#">
                        <div className="info-card">
                            <i className="fas fa-map-marker-alt"></i>
                            <div><h4>{admin?.location}</h4></div>
                        </div>
                    </a>
                    <a className='card-link' href={admin?.github} target="_blank" rel="noreferrer">
                        <div className="info-card">
                            <i className="fab fa-github"></i>
                            <div><h4>GitHub</h4></div>
                        </div>
                    </a>
                    <a className='card-link' href={admin?.linkedln} target="_blank" rel="noreferrer">
                        <div className="info-card">
                            <i className="fab fa-linkedin"></i>
                            <div><h4>LinkedIn</h4></div>
                        </div>
                    </a>
                </div>
            </div>

            {/* PROJELER ALANI */}
            <h2 className="section-title" id='projects'><span>Projelerim</span></h2>
            <div className="container">
                {projectsError ? (
                    <p style={{ color: "red" }}>{projectsError}</p>
                ) : (
                    <>
                        <div className="masonry-flex-container">
                            {projectColumns.map((col, colIndex) => (
                                <div className="masonry-col" key={colIndex}>
                                    {col.map((project) => (
                                        <div className="masonry-item" key={project.id}>
                                            <Project_Card
                                                id={project.id}
                                                img={project.img || ""}
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

                        {/* Proje Pagination */}
                        {totalProjectPages > 1 && (
                            <div className="pagination">
                                <button
                                    onClick={() => {
                                        setProjectPage(prev => Math.max(prev - 1, 1));
                                        scrollToSection("projects");
                                    }}
                                    disabled={projectPage === 1}>
                                    &lt;
                                </button>
                                {[...Array(totalProjectPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        className={projectPage === index + 1 ? 'active' : ''}
                                        onClick={() => {
                                            setProjectPage(index + 1);
                                            scrollToSection("projects");
                                        }}>
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => {
                                        setProjectPage(prev => Math.min(prev + 1, totalProjectPages));
                                        scrollToSection("projects");
                                    }}
                                    disabled={projectPage === totalProjectPages}>
                                    &gt;
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* BLOG ALANI */}
            <h2 className="section-title" id='blog'><span>Blog</span></h2>
            <div className="container">
                <div>
                    {blogsError ? (
                        <p style={{ color: "red" }}>{blogsError}</p>
                    ) : (
                        <>
                            <div>
                                {currentBlogs.map((blog) => (
                                    <div className="masonry-item" key={blog.id}>
                                        <Blog_Card
                                            title={blog.title}
                                            content={blog.description}
                                            date={formatDate(blog.date)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Blog Pagination */}
                            {totalBlogPages > 1 && (
                                <div className="pagination">
                                    <button
                                        onClick={() => {
                                            setBlogPage(prev => Math.max(prev - 1, 1));
                                            scrollToSection("blog");
                                        }}
                                        disabled={blogPage === 1}>
                                        &lt;
                                    </button>
                                    {[...Array(totalBlogPages)].map((_, index) => (
                                        <button
                                            key={index}
                                            className={blogPage === index + 1 ? 'active' : ''}
                                            onClick={() => {
                                                setBlogPage(index + 1);
                                                scrollToSection("blog");
                                            }}>
                                            {index + 1}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => {
                                            setBlogPage(prev => Math.min(prev + 1, totalBlogPages));
                                            scrollToSection("blog");
                                        }}
                                        disabled={blogPage === totalBlogPages}>
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* İLETİŞİM ALANI */}
            <h2 className="section-title" id='contact'><span>İletişim</span></h2>
            <div className="container">
                <Contact />
            </div>
        </div>
    )
}

export default Home;