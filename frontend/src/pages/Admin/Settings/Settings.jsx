import React, { useState, useEffect, useRef } from 'react';
import API_URL, { IMAGE_URL } from "../../../config/config.js";
import './Settings.css';

const Settings = () => {
  // Veritabanından gelen asıl veriler burada tutulur
  const [adminData, setAdminData] = useState({
    id: '', name: '', surname: '', username: '', email: '',
    about: '', location: '', github: '', linkedln: '', instagram: '', x: '', youtube: '', img: '', sections: ''
  });

  // Arka planda güncellenecek olan form verileri
  const [formData, setFormData] = useState({
    id: '', name: '', surname: '', username: '', email: '',
    about: '', location: '', github: '', linkedln: '', instagram: '', x: '', youtube: '', img: '', sections: ''
  });

  // Hangi alanlara tıklandı veya değiştirildi onu takip eden state'ler
  const [focusedFields, setFocusedFields] = useState({});
  const [editedFields, setEditedFields] = useState({});

  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const response = await fetch(API_URL.ADMIN.PROFILE, { headers: getAuthHeaders() });
      if (response.ok) {
        const data = await response.json();

        // Veritabanından dönen data.id varsa kullan, yoksa 1 yap
        const tableData = { ...data, id: data.id || 1 };

        const safeData = { ...tableData };
        for (const key in safeData) {
          if (key === 'sections' && data[key]) {
            safeData[key] = Array.isArray(data[key]) ? data[key].join(", ") : data[key];
          } else {
            safeData[key] = data[key] ?? '';
          }
        }
        
        setAdminData(safeData);
        setFormData(safeData); // Arka planda DB verileri formData'ya eklendi
      }
    } catch (error) {
      console.error("Admin bilgileri çekilemedi:", error);
    }
  };

  // Input odaklanma ve blur işlemleri
  const handleFocus = (e) => {
    setFocusedFields(prev => ({ ...prev, [e.target.name]: true }));
  };

  const handleBlur = (e) => {
    setFocusedFields(prev => ({ ...prev, [e.target.name]: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setEditedFields(prev => ({ ...prev, [name]: true })); // Bu alan değiştirildi olarak işaretle
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  // Ekranda gösterilecek değeri belirleyen yardımcı fonksiyon
  const getDisplayValue = (name) => {
    // Eğer input'a tıklandıysa veya daha önce bir şey yazıldıysa gerçek veriyi (formData) göster
    if (focusedFields[name] || editedFields[name]) {
      return formData[name] || '';
    }
    // Aksi halde boş göster ki placeholder (yer tutucu) devreye girsin
    return '';
  };

  const updateProfileInfo = async (e) => {
    e.preventDefault();
    
    // Zorunlu alan kontrolü (HTML required kullanmıyoruz çünkü inputlar görünürde boş)
    if (!formData.name || !formData.surname || !formData.username) {
      return showMessage('error', 'Lütfen zorunlu alanları (Ad, Soyad, Kullanıcı Adı) boş bırakmayın.');
    }

    setLoading(true);

    const updateId = adminData.id || 1;

    // formData arka planda tüm eski ve yeni verileri eksiksiz tuttuğu için 
    // sadece isim güncellense bile payload eksiksiz gidecektir.
    const payload = { ...formData };
    
    delete payload.id;
    delete payload._id;

    if (payload.sections && typeof payload.sections === 'string') {
      payload.sections = payload.sections.split(',').map(item => item.trim()).filter(Boolean);
    }

    try {
      const response = await fetch(API_URL.ADMIN.UPDATE(updateId), {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        showMessage('success', 'Bilgiler başarıyla güncellendi.');
        setAdminData({ ...formData, id: updateId });
        setEditedFields({}); // Başarılı kayıttan sonra tekrar gizlenip yer tutucuların görünmesi için
      } else {
        showMessage('error', 'Güncelleme hatası. Sunucu isteği reddetti.');
      }
    } catch (error) {
      showMessage('error', 'Sunucuya ulaşılamıyor.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('profileImage', file);

    try {
      const response = await fetch(API_URL.ADMIN.PROFILE_FILE, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formDataUpload
      });

      if (response.ok) {
        const data = await response.json();
        showMessage('success', 'Profil fotoğrafı başarıyla güncellendi. Sayfa yenileniyor...');
        setAdminData(prev => ({ ...prev, img: data.img }));
        setTimeout(() => window.location.reload(), 1500);
      } else {
        const errorText = await response.text();
        showMessage('error', `Hata: ${errorText}`);
      }
    } catch (error) {
      showMessage('error', 'Sunucu hatası.');
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return showMessage('error', 'Yeni şifreler eşleşmiyor!');
    }
    setLoading(true);
    try {
      const response = await fetch(API_URL.ADMIN.CHANGE, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ oldPassword: passwords.oldPassword, newPassword: passwords.newPassword })
      });

      if (response.ok) {
        showMessage('success', 'Şifreniz başarıyla güncellendi.');
        setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const errorData = await response.json().catch(() => null);
        showMessage('error', errorData?.error || 'İşlem başarısız, mevcut şifreniz hatalı.');
      }
    } catch (error) {
      showMessage('error', 'Sunucu hatası veya bağlantı problemi.');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="settings-container">
      {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div className="card profile-card">
            <div className="profile-image-container">
              {adminData.img ? (
                <img src={`${IMAGE_URL}${adminData.img}`} className="profile-img" alt="Profile" />
              ) : (
                <div className="profile-placeholder">
                  {adminData.name ? adminData.name.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
            </div>
            <h3 className="profile-name">{adminData.name} {adminData.surname}</h3>
            <p className="profile-role">@{adminData.username}</p>

            {adminData.sections && (
              <div className="profile-sections">
                {adminData.sections.split(',').map((section, index) => (
                  <span key={index} className="section-badge">{section.trim()}</span>
                ))}
              </div>
            )}

            <button className="btn-outline upload-btn" onClick={() => fileInputRef.current.click()}>
              Fotoğrafı Değiştir
            </button>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handlePhotoUpload} />

            <div className="social-links-display">
              {/* Sosyal medya iconları aynı bırakıldı */}
              {adminData.github && <a href={adminData.github} target="_blank" rel="noreferrer" title="GitHub"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>}
              {adminData.linkedln && <a href={adminData.linkedln} target="_blank" rel="noreferrer" title="LinkedIn"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>}
              {adminData.x && <a href={adminData.x} target="_blank" rel="noreferrer" title="X (Twitter)"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg></a>}
              {adminData.instagram && <a href={adminData.instagram} target="_blank" rel="noreferrer" title="Instagram"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>}
              {adminData.youtube && <a href={adminData.youtube} target="_blank" rel="noreferrer" title="YouTube"><svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>}
            </div>
          </div>

          <div className="card">
            <h3>Şifre Değiştir</h3>
            <form onSubmit={resetPassword}>
              <div className="form-group">
                <label>Mevcut Şifre</label>
                <input type="password" name="oldPassword" placeholder="Mevcut Şifreyi Girin" value={passwords.oldPassword} onChange={handlePasswordChange} required />
              </div>
              <div className="form-group">
                <label>Yeni Şifre</label>
                <input type="password" name="newPassword" placeholder="Yeni Şifreyi Girin" value={passwords.newPassword} onChange={handlePasswordChange} required />
              </div>
              <div className="form-group">
                <label>Yeni Şifre (Tekrar)</label>
                <input type="password" name="confirmPassword" placeholder="Şifreyi Tekrar Girin" value={passwords.confirmPassword} onChange={handlePasswordChange} required />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn-danger" disabled={loading}>Şifreyi Güncelle</button>
              </div>
            </form>
          </div>
        </aside>

        <main className="settings-content">
          <div className="card">
            <h3>Kişisel Bilgiler</h3>
            <form onSubmit={updateProfileInfo}>
              <div className="form-row">
                <div className="form-group">
                  <label>Ad</label>
                  <input type="text" name="name" placeholder="Adınızı girin" 
                    value={getDisplayValue('name')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="form-group">
                  <label>Soyad</label>
                  <input type="text" name="surname" placeholder="Soyadınızı girin" 
                    value={getDisplayValue('surname')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kullanıcı Adı</label>
                  <input type="text" name="username" placeholder="Kullanıcı adınızı girin" 
                    value={getDisplayValue('username')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="form-group">
                  <label>Konum</label>
                  <input type="text" name="location" placeholder="Konumunuzu girin" 
                    value={getDisplayValue('location')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              <div className="form-group">
                <label>Hakkımda</label>
                <textarea name="about" placeholder="Kendinizden bahsedin..." rows="4" maxLength="1000"
                  value={getDisplayValue('about')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                <small className="char-count">{getDisplayValue('about').length}/1000</small>
              </div>

              <div className="divider"></div>
              <h3>Sosyal Medya Bağlantıları</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>GitHub</label>
                  <input type="url" name="github" placeholder="GitHub linki" 
                    value={getDisplayValue('github')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input type="url" name="linkedln" placeholder="LinkedIn linki" 
                    value={getDisplayValue('linkedln')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>X (Twitter)</label>
                  <input type="url" name="x" placeholder="X linki" 
                    value={getDisplayValue('x')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="form-group">
                  <label>Instagram</label>
                  <input type="url" name="instagram" placeholder="Instagram linki" 
                    value={getDisplayValue('instagram')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>YouTube</label>
                  <input type="url" name="youtube" placeholder="YouTube linki" 
                    value={getDisplayValue('youtube')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="E-posta" 
                    value={getDisplayValue('email')} onChange={handleInputChange} onFocus={handleFocus} onBlur={handleBlur} />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Kaydediliyor...' : 'Bilgileri Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;