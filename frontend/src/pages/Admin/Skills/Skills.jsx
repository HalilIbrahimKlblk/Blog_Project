import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Skills.css";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import API_URL from "../../../config/config";

const IMAGE_BASE_PATH = "/img/";

const Skills = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { name: "title", label: "Yetenek Adı", type: "text" },
    { name: "img", label: "Resim Yolu", type: "text" },
  ];

  const columnLabels = {
    title: "Yetenek Adı",
    img: "Resim Yolu",
  };

  // GET ALL
  const fetchData = () => {
    axios
      .get(API_URL.SKILL.GET_ALL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("Liste hatası:", err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // SAVE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // UPDATE
        await axios.put(
          API_URL.SKILL.UPDATE(formData.id || formData._id),
          formData
        );
      } else {
        // SAVE
        await axios.post(
          API_URL.SKILL.SAVE,
          formData
        );
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
    setFormData(item);
    setIsEditing(true);
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        API_URL.SKILL.DELETE(id)
      );

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
          />
        </div>

        <div className="preview-section">
          <h3>Önizleme</h3>
          <div className="preview-content">
            {formData.img ? (
              <>
                <div className="preview-image-container">
                  <img
                    src={`${IMAGE_BASE_PATH}${formData.img}`}
                    alt={formData.title || "Önizleme"}
                    className="preview-image"
                  />
                  {formData.title && <p className="preview-title">{formData.title}</p>}
                </div>
              </>
            ) : (
              <p className="no-image-text">Resim adı girildiğinde önizleme burada görünecektir.</p>
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