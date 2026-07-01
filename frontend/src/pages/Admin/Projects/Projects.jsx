import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import API_URL from "../../../config/config";
import Project_Card from "../../../components/Project_Card/Project_Card"; 

const Projects = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { name: "img", label: "Resim Yolu", type: "text" },
    { name: "title", label: "Proje Başlığı", type: "text" },
    { name: "description", label: "Proje Açıklaması", type: "text" },
    { name: "skills", label: "Proje Becerileri (Virgülle ayırın)", type: "text" },
    { name: "github", label: "GitHub", type: "text" },
    { name: "linkedin", label: "LinkedIn", type: "text" },
    { name: "instagram", label: "Instagram", type: "text" },
    { name: "date", label: "Tarih", type: "date" },
  ];

  const columnLabels = {
    img: "Resim Yolu",
    title: "Proje Başlığı",
    //description: "Proje Açıklaması",
    skills: "Proje Becerileri",
    //socialMedia: "Sosyal Medya",
    heart: "Beğeni Sayısı",
    date: "Tarih",
  };

  const fetchData = () => {
    axios
      .get(API_URL.PROJECT.GET_ALL)
      .then((res) => setData(res.data))
      .catch((err) => console.log("Liste hatası:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🚀 EKLENEN YARDIMCI FONKSİYON: Tarihi güvenli String'e çevirir
  const getFormattedDate = (dateVal) => {
    if (!dateVal) return "";
    if (typeof dateVal === "string") return dateVal.split("T")[0];
    if (dateVal instanceof Date) {
      const year = dateVal.getFullYear();
      const month = String(dateVal.getMonth() + 1).padStart(2, "0");
      const day = String(dateVal.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return String(dateVal).split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      // Tarihi formata sokarak API'ye gönderiyoruz
      date: getFormattedDate(formData.date), 
      skills: formData.skills
        ? formData.skills.split(",").map((s) => s.trim())
        : [],
      socialMedia: {
        github: formData.github || "",
        linkedin: formData.linkedin || "",
        instagram: formData.instagram || "",
      },
    };

    try {
      if (isEditing) {
        await axios.put(
          API_URL.PROJECT.UPDATE(formData.id || formData._id),
          formattedData
        );
      } else {
        await axios.post(API_URL.PROJECT.SAVE, formattedData);
      }

      setFormData({});
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.log("Save/Update hatası:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      skills: item.skills?.join(", ") || "",
      github: item.socialMedia?.github || "",
      linkedin: item.socialMedia?.linkedin || "",
      instagram: item.socialMedia?.instagram || "",
      date: item.date?.split("T")[0] || "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL.PROJECT.DELETE(id));
      fetchData();
    } catch (err) {
      console.log("Silme hatası:", err);
    }
  };

  const hasFormData = Object.values(formData).some(val => val !== "" && val !== undefined);

  const previewSkills = formData.skills ? formData.skills.split(",").map((s) => s.trim()) : [];
  const previewLinks = {
    github: formData.github,
    linkedin: formData.linkedin,
    instagram: formData.instagram,
  };

  const safePreviewDate = getFormattedDate(formData.date);

  return (
    <div className="projects-page">
      <h2 className="content-h2">🗂️ Projelerim</h2>

      <div className="projects-top-container">
        
        <div className="form-section">
          <Form
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEditing={isEditing}
          />
        </div>

        <div className="preview-section">
          <h3>Önizleme</h3>
          <div className="preview-content">
            {hasFormData ? (
              <Project_Card
                img={formData.img}
                title={formData.title || "Proje Başlığı"}
                description={formData.description || "Proje açıklaması buraya gelecek..."}
                skills={previewSkills.length > 0 ? previewSkills : ["Örnek Yetenek"]}
                date={safePreviewDate || "YYYY-MM-DD"} 
                links={previewLinks}
                likeSum={Number(formData.heart) || 0}
              />
            ) : (
              <p className="no-data-text">
                Proje bilgileri girildiğinde kart önizlemesi burada görünecektir.
              </p>
            )}
          </div>
        </div>

      </div>

      <div className="table-section">
        <Table
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          columnLabels={columnLabels}
        />
      </div>
    </div>
  );
};

export default Projects;