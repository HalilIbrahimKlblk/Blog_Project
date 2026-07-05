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
  
  const [selectedFile, setSelectedFile] = useState(null);

  const fields = [
    { name: "img", label: "Proje Resmi", type: "file" }, 
    { name: "title", label: "Proje Başlığı", type: "text" },
    { name: "description", label: "Proje Açıklaması", type: "textarea" },
    { name: "skills", label: "Proje Becerileri (Virgülle ayırın)", type: "text" },
    { name: "github", label: "GitHub", type: "text" },
    { name: "linkedin", label: "LinkedIn", type: "text" },
    { name: "instagram", label: "Instagram", type: "text" },
    { name: "date", label: "Tarih", type: "date" },
  ];

  const columnLabels = {
    img: "Resim Yolu",
    title: "Proje Başlığı",
    skills: "Proje Becerileri",
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
      heart: formData.heart !== undefined ? formData.heart : 0,
      date: getFormattedDate(formData.date),
      skills: formData.skills ? formData.skills.split(",").map((s) => s.trim()) : [],
      socialMedia: {
        github: formData.github || "",
        linkedin: formData.linkedin || "",
        instagram: formData.instagram || "",
      },
    };

    // 🚀 DEĞİŞİKLİK 3: Verileri FormData içine koyuyoruz
    const formDataToSend = new FormData();
    
    // Proje JSON verisini Blob olarak ekliyoruz (@RequestPart("project") için)
    formDataToSend.append("project", new Blob([JSON.stringify(formattedData)], {
        type: "application/json"
    }));

    // Seçilen dosya varsa ekliyoruz (@RequestPart("file") için)
    if (selectedFile) {
        formDataToSend.append("file", selectedFile);
    }

    // İstek atarken kullanacağımız ortak header
    const axiosConfig = {
        headers: { "Content-Type": "multipart/form-data" }
    };

    try {
      if (isEditing) {
        await axios.put(
          API_URL.PROJECT.UPDATE(formData.id || formData._id),
          formDataToSend, 
          axiosConfig // 🚀 Config eklendi
        );
      } else {
        await axios.post(
            API_URL.PROJECT.SAVE, 
            formDataToSend, 
            axiosConfig // 🚀 Config eklendi
        );
      }

      setFormData({});
      setSelectedFile(null); // 🚀 Başarılı olunca dosya state'ini temizle
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
    setSelectedFile(null); // 🚀 Edit moduna geçerken önceki kalıntı dosyayı temizle
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

  // 🚀 DEĞİŞİKLİK 4: Form bileşenine dosyayı yakalaması için fonksiyon gönderiyoruz
  const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
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
            onFileChange={handleFileChange} // 🚀 Yeni ekledik
          />
        </div>
        <div className="preview-section">
          <h3>Önizleme</h3>
          <div className="preview-content">
            {hasFormData ? (
              <Project_Card
                img={selectedFile ? URL.createObjectURL(selectedFile) : formData.img || ""}
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