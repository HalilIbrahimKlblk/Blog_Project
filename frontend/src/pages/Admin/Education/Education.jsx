import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Education.css";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import API_URL from "../../../config/config";

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

  // GET ALL
  const fetchData = () => {
    axios
      .get(API_URL.EDUCATION.GET_ALL)
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
          API_URL.EDUCATION.UPDATE(formData.id || formData._id),
          formData
        );
      } else {
        // SAVE
        await axios.post(
          API_URL.EDUCATION.SAVE,
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
        API_URL.EDUCATION.DELETE(id)
      );

      fetchData();
    } catch (err) {
      console.log("Silme hatası:", err);
    }
  };

  return (
    <div className="education-page">
      <h2>🎓Eğitim Bilgilerim</h2>

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

export default Education;