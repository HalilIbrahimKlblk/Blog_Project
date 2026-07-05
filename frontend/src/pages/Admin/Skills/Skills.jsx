import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Skills.css";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import API_URL, { IMAGE_URL } from "../../../config/config";

const Skills = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  
  // Dosya yükleme ve önizleme için state'ler
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Form bileşeninin type: "file" desteklediğini biliyoruz
  const fields = [
    { name: "title", label: "Yetenek Adı", type: "text" },
    { name: "file", label: "Resim Seç", type: "file" }, 
  ];

  const columnLabels = {
    title: "Yetenek Adı",
    img: "Resim Yolu", 
  };

  // GET ALL
  const fetchData = () => {
    axios
      .get(API_URL.SKILL.GET_ALL)
      .then((res) => setData(res.data))
      .catch((err) => console.log("Liste hatası:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Yeni dosya seçildiğinde yerel önizleme oluşturma
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl); 
  }, [selectedFile]);

  // FORM.JSX İÇİN ÖZEL DOSYA YAKALAYICI FONKSİYON
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // SAVE + UPDATE
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const submitData = new FormData();

    const skillDto = {
      title: formData.title,
      ...(isEditing && { id: formData.id || formData._id })
    };
    
    submitData.append(
      "skill",
      new Blob([JSON.stringify(skillDto)], { type: "application/json" })
    );

    // Seçilen dosyayı ekle
    if (selectedFile) {
      submitData.append("file", selectedFile);
    }

    try {
      if (isEditing) {
        await axios.put(
          API_URL.SKILL.UPDATE(skillDto.id),
          submitData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          API_URL.SKILL.SAVE,
          submitData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // Başarılı işlem sonrası her şeyi sıfırla
      setFormData({});
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsEditing(false);
      
      fetchData();
    } catch (err) {
      console.log("Save/Update hatası:", err);
    }
  };

  // EDIT
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setSelectedFile(null); // Düzenlemeye geçerken önceki seçili dosyayı temizle
    setPreviewUrl(null);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL.SKILL.DELETE(id));
      fetchData();
    } catch (err) {
      console.log("Silme hatası:", err);
    }
  };

  return (
    <div className="skills-page">
      <h2 className="content-h2">💡 Becerilerim</h2>

      <div className="form-preview-container">
        <div className="form-section">
          <Form
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            onFileChange={handleFileChange} 
          />
        </div>

        <div className="preview-section">
          <h3>Önizleme</h3>
          <div className="preview-content">
            {(previewUrl || formData.img) ? (
              <div className="preview-image-container">
                <img
                  src={previewUrl ? previewUrl : `${IMAGE_URL}${formData.img}`}
                  alt={formData.title || "Önizleme"}
                  className="preview-image"
                />
                {formData.title && <p className="preview-title">{formData.title}</p>}
              </div>
            ) : (
              <p className="no-image-text">Lütfen bir resim seçin.</p>
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

export default Skills;