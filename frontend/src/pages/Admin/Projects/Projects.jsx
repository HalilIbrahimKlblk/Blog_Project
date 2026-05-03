import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Projects.css";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import API_URL from "../../../config/config";

const Projects = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { name: "img", label: "Resim Yolu", type: "text" },
    { name: "title", label: "Proje Başlığı", type: "text" },
    { name: "description", label: "Proje Açıklaması", type: "text" },
    { name: "skills", label: "Proje Becerileri", type: "text" },
    { name: "github", label: "GitHub", type: "text" },
    { name: "linkedin", label: "LinkedIn", type: "text" },
    { name: "instagram", label: "Instagram", type: "text" },
    { name: "heart", label: "Beğeni Sayısı", type: "number" },
    { name: "date", label: "Tarih", type: "date" },
  ];

  const columnLabels = {
    img: "Resim Yolu",
    title: "Proje Başlığı",
    description: "Proje Açıklaması",
    skills: "Proje Becerileri",
    socialMedia: "Sosyal Medya",
    heart: "Beğeni Sayısı",
    date: "Tarih",
  };

  // GET ALL
  const fetchData = () => {
    axios
      .get(API_URL.PROJECT.GET_ALL)
      .then((res) => setData(res.data))
      .catch((err) => console.log("Liste hatası:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SAVE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,

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

  // EDIT
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

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL.PROJECT.DELETE(id));
      fetchData();
    } catch (err) {
      console.log("Silme hatası:", err);
    }
  };

  return (
    <div className="blog-page">
      <h2>🗂️ Projelerim</h2>

      <Form
        fields={fields}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />

      <Table
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columnLabels={columnLabels}
      />
    </div>
  );
};

export default Projects;