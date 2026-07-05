import React, { useState, useEffect } from 'react';
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import './Content.css';
import API_URL from '../../../config/config.js';


const Content = () => {
  const [adminData, setAdminData] = useState([]);
  const [formData, setFormData] = useState({
    name: "", surname: "", email: "", img: "", location: "", github: "", linkedln: "", instagram: "", x: "", youtube: "", about: "", sections: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch(API_URL.ADMIN.PROFILE);
      if (!response.ok) throw new Error("Veri çekilemedi");
      const data = await response.json();

      const tableData = { id: data.id || 1, ...data };
      setAdminData([tableData]);
    } catch (error) {
      console.error("Admin profili yüklenirken hata:", error);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const handleEdit = (item) => {
    const originalItem = adminData.find(admin => admin.id === item.id) || item;

    const editableItem = {
      ...originalItem,
      sections: Array.isArray(originalItem.sections) ? originalItem.sections.join(", ") : originalItem.sections
    };
    setFormData(editableItem);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    alert("Sistemdeki ana admin profili silinemez, ancak güncellenebilir.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateId = formData.id || 1;

      const payload = { ...formData };

      delete payload.id;
      delete payload._id;

      if (typeof payload.sections === "string") {
        payload.sections = payload.sections.split(",")
          .map(s => s.trim())
          .filter(s => s !== "");
      }

      const response = await fetch(API_URL.ADMIN.UPDATE(updateId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        alert("Güncelleme başarısız! Hata kodu: 400 Bad Request. Konsolu kontrol et.");
        return;
      }

      alert("Admin profili başarıyla güncellendi!");

      setFormData({
        name: "", surname: "", email: "", img: "", location: "", github: "", linkedln: "", instagram: "", x: "", youtube: "", about: "", sections: ""
      });
      setIsEditing(false);

      fetchAdminProfile();
      window.location.reload();
    } catch (error) {
      console.error("Ağ veya Sunucu hatası:", error);
      alert("Sunucuya ulaşılamadı.");
    }
  };

  const formFields = [
    { name: "name", label: "Ad", type: "text" },
    { name: "surname", label: "Soyad", type: "text" },
    { name: "email", label: "E-Posta", type: "text" },
    { name: "location", label: "Konum", type: "text" },
    { name: "github", label: "GitHub Profili", type: "text" },
    { name: "linkedln", label: "LinkedIn Profili", type: "text" },
    { name: "instagram", label: "Instagram Profili", type: "text" },
    { name: "x", label: "X Profili", type: "text" },
    { name: "youtube", label: "YouTube Profili", type: "text" },
    { name: "sections", label: "Uzmanlıklar (Virgülle ayırın)", type: "text" },
    { name: "about", label: "Hakkında", type: "textarea" },
  ];

  const columnLabels = {
    name: "Ad", surname: "Soyad", email: "E-Posta", location: "Konum", sections: "Uzmanlık"
  };

  const hasPreviewData = Object.values(formData).some(val => val && val.length > 0);

  return (
    /* Ana kapsayıcıya taşma önleyici in-line kural eklendi */
    <div className="content-container" style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <div className="content-header">
        <h2 className="content-h2">👤 Admin Profili</h2>
      </div>

      <div className="content-layout">
        <div className="table-section">
          {/* Wrapper içerisindeki tablonun dışarı taşmasını kesin olarak engellemek için %100 genişlik */}
          <div className="table-responsive-wrapper" style={{ width: "100%", overflowX: "auto" }}>
            <Table
              data={adminData.map(item => ({
                id: item.id,
                name: item.name,
                surname: item.surname,
                email: item.email,
                location: item.location,
                sections: Array.isArray(item.sections) ? item.sections.join(", ") : item.sections
              }))}
              onEdit={handleEdit}
              onDelete={handleDelete}
              columnLabels={columnLabels}
            />
          </div>
        </div>

        <div className="form-and-preview-container">
          <div className="form-section">
            <Form fields={formFields} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} isEditing={isEditing} />
          </div>

          <div className="content-section preview-section">
            <h3>Ön İzleme</h3>
            {!hasPreviewData ? (
              <div className="empty-preview-message">
                Bilgiler girildiğinde ön izleme burada görünecektir.
              </div>
            ) : (
              <div className="preview-card" style={{ maxWidth: "100%", overflow: "hidden" }}>
                <div className="preview-image-container">
                  <img
                    src={formData.img}
                    alt="Profil"
                    className="preview-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="preview-details" style={{ width: "100%" }}>
                  <h4 style={{ wordBreak: "break-word" }}>{formData.name} {formData.surname}</h4>

                  <p className="preview-sections" style={{ wordBreak: "break-word" }}>
                    {Array.isArray(formData.sections) ? formData.sections.join(", ") : formData.sections}
                  </p>

                  <div className="preview-info" style={{ wordBreak: "break-word" }}>
                    {formData.location && <span>📍 {formData.location}</span>}
                    {formData.email && <span>✉️ {formData.email}</span>}
                  </div>

                  {/* Güncellenen Sosyal Medya İkonları Alanı */}
                  {(formData.github || formData.linkedln || formData.instagram || formData.x || formData.youtube) && (
                    <div className="preview-social-links">
                      {formData.github && (
                        <a href={formData.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {formData.linkedln && (
                        <a href={formData.linkedln} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {formData.instagram && (
                        <a href={formData.instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                          </svg>
                        </a>
                      )}
                      {formData.x && (
                        <a href={formData.x} target="_blank" rel="noopener noreferrer" title="X (Twitter)">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      )}
                      {formData.youtube && (
                        <a href={formData.youtube} target="_blank" rel="noopener noreferrer" title="YouTube">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Uzun yazılarda flex/gridi patlatmaması için overflowWrap eklendi */}
                  <p className="preview-about" style={{ overflowWrap: "anywhere" }}>
                    {formData.about}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;