import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Kütüphanenin temel stilleri
import "./Form.css";

// 🚀 DEĞİŞİKLİK 1: onFileChange prop'unu ekledik. Varsayılan olarak boş fonksiyon verdik ki diğer sayfalar bozulmasın.
const Form = ({ fields, formData, setFormData, onSubmit, isEditing, onFileChange = () => {} }) => {
    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form className="custom-form" onSubmit={onSubmit} style={{ marginBottom: "20px" }}>
            {fields.map((field) => (
                <div key={field.name} style={{ marginBottom: "10px" }}>
                    <label>{field.label}</label>

                    {field.type === "textarea" ? (
                        <textarea
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    ) : field.type === "date" ? (
                        /* Gelişmiş React DatePicker Bileşeni */
                        <DatePicker
                            selected={formData[field.name] ? new Date(formData[field.name]) : null}
                            onChange={(date) => handleChange(field.name, date)}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="gg.aa.yyyy"
                            className="custom-datepicker-input" // Input alanını CSS'te yakalamak için
                            showIcon // İkonu gösterir
                            toggleCalendarOnIconClick
                        />
                    ) : field.type === "file" ? (
                        /* 🚀 DEĞİŞİKLİK 2: Dosya inputu için özel ve güvenli render alanı */
                        <input
                            type="file"
                            accept="image/*" // Sadece resim dosyalarının seçilmesini kolaylaştırır
                            onChange={onFileChange} // Üst bileşenden (Projects.jsx) gelen fonksiyonu tetikler
                            // DİKKAT: File inputlarında 'value' kullanılamaz, o yüzden formData[field.name] vermiyoruz!
                        />
                    ) : (
                        /* Mevcut standart input yapın (text, number vs. için) */
                        <input
                            type={field.type || "text"}
                            value={formData[field.name] || ""}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                        />
                    )}
                </div>
            ))}

            <button className="save-btn" type="submit">
                {isEditing ? "Güncelle" : "Kaydet"}
            </button>
        </form>
    );
};

export default Form;