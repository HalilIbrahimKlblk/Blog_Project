import React from "react";
import "./Table.css";

const Table = ({ data, onEdit, onDelete, columnLabels }) => {
  if (!data || data.length === 0) return <p>Veri yok</p>;

  const columns = Object.keys(data[0]).filter((key) => key !== "__v");

  // İçeriği temizleyip 100 karakterde kesen fonksiyon
  const formatContent = (value, key) => {
    if (!value) return "-";

    // Eğer kolon içeriği 'icerik' veya 'content' ise kısaltma uygula
    if (key.toLowerCase() === "icerik" || key.toLowerCase() === "content") {
      const plainText = value.replace(/<[^>]*>?/gm, ''); // HTML etiketlerini temizle
      return plainText.length > 100 ? plainText.substring(0, 100) + "..." : plainText;
    }

    if (typeof value === "string" && value.includes("<")) {
      return <div className="table-html-content" dangerouslySetInnerHTML={{ __html: value }} />;
    }

    if (Array.isArray(value)) return value.join(", ");

    if (typeof value === "object") {
      return (
        <div>
          {Object.entries(value).map(([k, v]) => (
            v && <div key={k}>{k}: {v}</div>
          ))}
        </div>
      );
    }

    return value;
  };

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{columnLabels?.[col] || col}</th>
            ))}
            <th>Güncelle</th>
            <th>Sil</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id || item._id}>
              {columns.map((col) => (
                <td key={col} data-label={columnLabels?.[col] || col}>
                  {formatContent(item[col], col)}
                </td>
              ))}
              <td data-label="Güncelle">
                <button className="update-btn" onClick={() => onEdit(item)}>
                  Güncelle
                </button>
              </td>
              <td data-label="Sil">
                <button
                  className="delete-btn"
                  onClick={() => {
                    // Kullanıcıya onay penceresi gösteriyoruz
                    if (window.confirm("Bu kaydı gerçekten silmek istiyor musunuz?")) {
                      onDelete(item.id || item._id);
                    }
                  }}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;