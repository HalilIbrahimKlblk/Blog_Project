import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog.css";
import Form from "../../../components/Form/Form";
import Table from "../../../components/Table/Table";
import API_URL from "../../../config/config";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

const Blog = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const fields = [
    { name: "title", label: "Blog Başlığı", type: "text" },
    { name: "date", label: "Tarih", type: "date" },
  ];

  const columnLabels = {
    title: "Blog Başlığı",
    date: "Tarih",
    description: "İçerik",
  };

  // ✅ KRİTİK FIX BURADA
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // 🔥 ÇAKIŞMAYI ENGELLE
        underline: false,
        link: false,
      }),

      // sonra tekrar ekle
      Underline,
      Link.configure({
        openOnClick: false,
      }),

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({
        ...prev,
        description: editor.getHTML(),
      }));
    },
  });

  // 📌 GET ALL
  const fetchData = () => {
    axios
      .get(API_URL.BLOG.GET_ALL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 📌 RESET
  const resetForm = () => {
    setFormData({});
    setIsEditing(false);
    editor?.commands.setContent("");
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    let formattedDate = null;
    
    if (formData.date) {
      if (typeof formData.date === "string") {
        formattedDate = formData.date.split("T")[0];
      } else if (formData.date instanceof Date) {
        const year = formData.date.getFullYear();
        const month = String(formData.date.getMonth() + 1).padStart(2, '0');
        const day = String(formData.date.getDate()).padStart(2, '0');
        formattedDate = `${year}-${month}-${day}`;
      } else {
        formattedDate = String(formData.date).split("T")[0];
      }
    }

    const payload = {
      title: formData.title,
      date: formattedDate, 
      description: editor?.getHTML() || ""
    };

    try {
      if (isEditing) {
        const targetId = formData.id || formData._id;
        await axios.put(API_URL.BLOG.UPDATE(targetId), {
          ...payload,
          id: targetId
        });
      } else {
        await axios.post(API_URL.BLOG.SAVE, payload);
      }
      resetForm();
      fetchData();
    } catch (err) {
      console.error("Hata:", err.response?.data || err.message);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      ...item,
      date: item.date ? item.date.split("T")[0] : "",
    });

    editor?.commands.setContent(item.description || "");
    setIsEditing(true);
  };

  // 📌 DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(API_URL.BLOG.DELETE(id));
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const addLink = () => {
    const url = prompt("Link gir:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="blog-page">
      <h2 className="content-h2">💻 Yazılım Blogum</h2>

      <div className="editor-wrapper">
        
        <div className="editor-section">
          <label>Blog İçeriği</label>

          <div className="toolbar">
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
              <span className="material-symbols-outlined">format_bold</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
              <span className="material-symbols-outlined">format_italic</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
              <span className="material-symbols-outlined">format_underlined</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <span className="material-symbols-outlined">format_H1</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <span className="material-symbols-outlined">format_H2</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              <span className="material-symbols-outlined">format_H3</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <span className="material-symbols-outlined">list</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <span className="material-symbols-outlined">format_list_numbered</span>
            </button>

            <button onClick={() => editor.chain().focus().setTextAlign("left").run()}>
              <span className="material-symbols-outlined">format_align_left</span>
            </button>

            <button onClick={() => editor.chain().focus().setTextAlign("center").run()}>
              <span className="material-symbols-outlined">format_align_center</span>
            </button>

            <button onClick={() => editor.chain().focus().setTextAlign("right").run()}>
              <span className="material-symbols-outlined">format_align_right</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              <span className="material-symbols-outlined">format_quote</span>
            </button>

            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
              <span className="material-symbols-outlined">code</span>
            </button>

            <button onClick={addLink}>
              <span className="material-symbols-outlined">link</span>
            </button>

            <button onClick={() => editor.chain().focus().undo().run()}>
              <span className="material-symbols-outlined">undo</span>
            </button>

            <button onClick={() => editor.chain().focus().redo().run()}>
              <span className="material-symbols-outlined">redo</span>
            </button>
          </div>

          <EditorContent editor={editor} className="tiptap-editor" />
        </div>

        <div className="form-section">
          <Form
            fields={fields}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isEditing={isEditing}
          />
        </div>
      </div>

      <Table
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columnLabels={columnLabels}
      />
    </div>
  );
};

export default Blog;