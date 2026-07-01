import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Education.css";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import API_URL from "../../../config/config";

const EducationPreview = ({ year, title, section }) => {
  return (
    <ul className="education-preview-list">
      <li>
        {/* Kullanıcı sadece bir alanı doldurursa, diğer alanlar boş kalmasın diye varsayılan metinler duruyor */}
        <span className="date">{year || "Tarih (Örn: 2018 - 2022)"}</span>
        <div className="content">
          <h3>{section || "Bölüm Adı"}</h3>
          <p>{title || "Okul Adı"}</p>
        </div>
      </li>
    </ul>
  );
};

const Education = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { name: "date", label: "Tarih", type: "text" },
    { name: "title", label: "Okul Adı", type: "text" },
    { name: "section", label: "Bölüm Adı", type: "text" },
  ];

  const columnLabels = {
    date: "Tarih",
    title: "Okul Adı",
    section: "Bölüm Adı",
  };

  const fetchData = () => {
    axios
      .get(API_URL.EDUCATION.GET_ALL)
      .then((res) => setData(res.data))
      .catch((err) => console.log("Liste hatası:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(API_URL.EDUCATION.UPDATE(formData.id || formData._id), formData);
      } else {
        await axios.post(API_URL.EDUCATION.SAVE, formData);
      }
      setFormData({});
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.log("Save/Update hatası:", err);
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL.EDUCATION.DELETE(id));
      fetchData();
    } catch (err) {
      console.log("Silme hatası:", err);
    }
  };

  // KOŞUL: Formdaki alanlardan herhangi biri dolu mu?
  const hasFormData = formData.date || formData.title || formData.section;

  return (
    <div className="education-page">
      <h2 className="content-h2">🎓 Eğitim Bilgilerim</h2>

      <div className="education-top-container">
        
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
              <EducationPreview
                year={formData.date}
                title={formData.title}
                section={formData.section}
              />
            ) : (
              <p className="no-data-text">Eğitim bilgileri girildiğinde önizleme burada görünecektir.</p>
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

export default Education;