import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import API_URL from "../../../config/config.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    blogCount: 0,
    projectCount: 0,
    educationCount: 0,
    skillCount: 0
  });

  const [popularProjects, setPopularProjects] = useState([]);
  const [recentProjects, setRecentProjects] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [blogRes, projectRes, eduRes, skillRes] = await Promise.all([
          fetch(API_URL.BLOG.GET_ALL),
          fetch(API_URL.PROJECT.GET_ALL),
          fetch(API_URL.EDUCATION.GET_ALL),
          fetch(API_URL.SKILL.GET_ALL)
        ]);

        const blogs = await blogRes.json();
        const projects = await projectRes.json();
        const educations = await eduRes.json();
        const skills = await skillRes.json();

        // İstatistikleri Güncelle
        setStats({
          blogCount: blogs.length || 0,
          projectCount: projects.length || 0,
          educationCount: educations.length || 0,
          skillCount: skills.length || 0
        });

        // En Çok Beğenilen 5 Projeyi Al
        const sortedByLikes = [...projects]
          .sort((a, b) => (b.heart || 0) - (a.heart || 0))
          .slice(0, 5);
        setPopularProjects(sortedByLikes);

        // Son Eklenen 3 Proje
        const latestProjects = [...projects]
          .sort((a, b) => {
            // Tarihe göre sırala
            const dateA = new Date(a.createdAt || a.date).getTime();
            const dateB = new Date(b.createdAt || b.date).getTime();
            if (dateA && dateB) return dateB - dateA; 
            return b.id - a.id; 
          })
          .slice(0, 3);
        setRecentProjects(latestProjects);

        // Son Eklenen 3 Blog Yazısı 
        const latestBlogs = [...blogs]
          .sort((a, b) => {
            const dateA = new Date(a.createdAt || a.date).getTime();
            const dateB = new Date(b.createdAt || b.date).getTime();
            if (dateA && dateB) return dateB - dateA;
            return b.id - a.id; 
          })
          .slice(0, 3);
        setRecentBlogs(latestBlogs);

      } catch (error) {
        console.error("Dashboard verileri çekilirken bir hata oluştu:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Grafik bar uzunluklarını orantılamak için en yüksek beğeni sayısını buluyoruz
  const maxHearts = popularProjects.length > 0 
    ? Math.max(...popularProjects.map(p => p.heart || 0)) 
    : 1;

  return (
    <div className="dashboard-container">

      {/* İstatistik Kartları */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon project-icon">💻</div>
          <div className="stat-details">
            <h3>Projeler</h3>
            <p className="stat-number">{stats.projectCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon blog-icon">📝</div>
          <div className="stat-details">
            <h3>Blog Yazıları</h3>
            <p className="stat-number">{stats.blogCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon skill-icon">⚡</div>
          <div className="stat-details">
            <h3>Yetenekler</h3>
            <p className="stat-number">{stats.skillCount}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon education-icon">🎓</div>
          <div className="stat-details">
            <h3>Eğitimler</h3>
            <p className="stat-number">{stats.educationCount}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions-section">
        <h3>Hızlı İşlemler</h3>
        <div className="quick-actions-grid">
          <button className="action-btn" onClick={() => navigate('/admin/projects')}>
            <span className="action-icon">➕</span>
            Proje Ekle
          </button>
          <button className="action-btn" onClick={() => navigate('/admin/blog')}>
            <span className="action-icon">✍️</span>
            Blog Ekle
          </button>
          <button className="action-btn" onClick={() => navigate('/admin/skills')}>
            <span className="action-icon">💡</span>
            Yetenek Ekle
          </button>
          <button className="action-btn" onClick={() => navigate('/admin/education')}>
            <span className="action-icon">🏫</span>
            Eğitim Ekle
          </button>
        </div>
      </div>

      <div className="dashboard-chart-section">
        <div className="widget-box full-width">
          <div className="widget-header">
            <h3>📊 Proje Beğeni Analizi</h3>
          </div>
          <div className="widget-content">
            {popularProjects.length > 0 ? (
              <div className="custom-bar-chart">
                {popularProjects.map((project) => {
                  const heartCount = project.heart || 0;
                  const barWidth = maxHearts > 0 ? (heartCount / maxHearts) * 100 : 0;
                  return (
                    <div className="chart-row" key={project.id}>
                      <div className="chart-label" title={project.title}>
                        {project.title}
                      </div>
                      <div className="chart-bar-container">
                        <div 
                          className="chart-bar-fill" 
                          style={{ width: `${barWidth}%` }}
                        >
                          <span className="chart-value">{heartCount} ❤︎</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="empty-text">Henüz beğeni almış proje bulunmuyor...</p>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-widgets bottom-widgets">
        <div className="widget-box">
          <div className="widget-header">
            <h3>💻 Son Eklenen Projeler</h3>
          </div>
          <div className="widget-content">
            {recentProjects.length > 0 ? (
              <div className="widget-list">
                {recentProjects.map((project) => (
                  <div key={project.id} className="widget-list-item">
                    <span className="list-dot project-dot"></span>
                    <div className="item-title">{project.title}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-text">Henüz proje eklenmemiş...</p>
            )}
          </div>
        </div>

        <div className="widget-box">
          <div className="widget-header">
            <h3>📝 Son Blog Yazıları</h3>
          </div>
          <div className="widget-content">
            {recentBlogs.length > 0 ? (
              <div className="widget-list">
                {recentBlogs.map((blog) => (
                  <div key={blog.id} className="widget-list-item">
                    <span className="list-dot blog-dot"></span>
                    <div className="item-title">{blog.title}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-text">Henüz blog yazısı eklenmemiş...</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;