import React, { useState, useEffect } from 'react';
import API_URL from '../../../config/config.js'; // Kendi dosya yoluna göre ayarla
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCalendarData = async () => {
            try {
                setLoading(true);
                
                const blogsPromise = fetch(API_URL.BLOG.GET_ALL).then(res => {
                    if (!res.ok) throw new Error('Blog verileri alınamadı');
                    return res.json();
                });

                const projectsPromise = fetch(API_URL.PROJECT.GET_ALL).then(res => {
                    if (!res.ok) throw new Error('Proje verileri alınamadı');
                    return res.json();
                });

                const [blogsData, projectsData] = await Promise.all([blogsPromise, projectsPromise]);

                const formattedBlogs = blogsData.map(blog => ({
                    id: `blog-${blog.id}`,
                    date: blog.date ? blog.date.split('T')[0] : '', 
                    type: 'blog',
                    title: blog.title
                }));

                const formattedProjects = projectsData.map(project => ({
                    id: `project-${project.id}`,
                    date: project.date ? project.date.split('T')[0] : '',
                    type: 'project',
                    title: project.title
                }));

                setEvents([...formattedBlogs, ...formattedProjects]);
                setError(null);
            } catch (err) {
                console.error("Veri çekme hatası:", err);
                setError("Veriler yüklenirken bir sorun oluştu.");
            } finally {
                setLoading(false);
            }
        };
        
        fetchCalendarData();
    }, []);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    const monthNames = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getEventsForDay = (day) => {
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(event => event.date === formattedDate);
    };

    // İSTATİSTİK VE TARİH HESAPLAMALARI
    const blogs = events.filter(e => e.type === 'blog');
    const projects = events.filter(e => e.type === 'project');

    const totalBlogs = blogs.length;
    const totalProjects = projects.length;

    // En son tarihi bulan yardımcı fonksiyon
    const getLatestDate = (arr) => {
        if (!arr || arr.length === 0) return 'Yok';
        const latest = arr.reduce((prev, current) => (prev.date > current.date ? prev : current));
        
        if (!latest.date) return 'Tarih Yok';
        const [y, m, d] = latest.date.split('-');
        return `${d}.${m}.${y}`;
    };

    const latestBlogDate = getLatestDate(blogs);
    const latestProjectDate = getLatestDate(projects);

    if (loading) {
        return <div className="calendar-status">Takvim verileri yükleniyor...</div>;
    }

    if (error) {
        return <div className="calendar-status error">{error}</div>;
    }

    // Gerçek bugünün tarihini alıyoruz (Takvimde gezinirken bugünü doğru bulması için)
    const actualToday = new Date();

    return (
        <div className="calendar-wrapper">
            <div className="calendar-header">
                <button onClick={prevMonth}>&lt; <span className="calendar-span">Önceki</span></button>
                <h2>{monthNames[month]} {year}</h2>
                <button onClick={nextMonth}><span className="calendar-span">Sonraki</span> &gt;</button>
            </div>

            <div className="calendar-grid">
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                ))}

                {[...Array(adjustedFirstDay)].map((_, index) => (
                    <div key={`empty-${index}`} className="calendar-day empty"></div>
                ))}

                {[...Array(daysInMonth)].map((_, index) => {
                    const day = index + 1;
                    const dayEvents = getEventsForDay(day);
                    
                    // Takvimde çizilen gün, gerçek bugüne eşit mi kontrolü
                    const isToday = 
                        day === actualToday.getDate() && 
                        month === actualToday.getMonth() && 
                        year === actualToday.getFullYear();

                    return (
                        <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                            <span className="day-number">{day}</span>
                            <div className="event-dots">
                                {dayEvents.map(event => (
                                    <div 
                                        key={event.id} 
                                        className={`event-dot ${event.type}`}
                                        title={event.title}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="calendar-footer">
                <div className="legend-area">
                    <div className="legend-item">
                        <span className="legend-dot blog"></span>
                        <span><strong>Blog</strong> (Toplam: {totalBlogs})</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot project"></span>
                        <span><strong>Proje</strong> (Toplam: {totalProjects})</span>
                    </div>
                </div>
                
                <div className="stats-area">
                    <p>Son Blog Eklenme: <span>{latestBlogDate}</span></p>
                    <p>Son Proje Eklenme: <span>{latestProjectDate}</span></p>
                </div>
            </div>
        </div>
    );
};

export default Calendar;