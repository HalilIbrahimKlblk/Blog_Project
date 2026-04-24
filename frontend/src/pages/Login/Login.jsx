import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // --- Modal (Şifremi Unuttum) Stateleri ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetStatus, setResetStatus] = useState("idle"); // idle, loading, success, error
  const [resetMessage, setResetMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/blog-api/v1/admin/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.data === true || response.data === "true") {
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("username", username);

        setTimeout(() => {
          navigate("/admin");
        }, 300);
      } else {
        alert("Kullanıcı adı veya şifre yanlış");
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }

      alert("Sunucu hatası");
      setUsername("");
      setPassword("");
    }
  };

  // --- Şifre Sıfırlama İstek Fonksiyonu ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetStatus("loading");
    setResetMessage("");

    try {
      const response = await axios.post(
        "http://localhost:8080/blog-api/v1/admin/forgot-password",
        { email: resetEmail }
      );

      if (response.data === true || response.data === "true") {
        setResetStatus("success");
        setResetMessage("Sıfırlama bağlantısı e-posta adresinize gönderildi.");
      } else {
        setResetStatus("error");
        setResetMessage("Sistemde bu e-posta adresiyle kayıtlı bir admin bulunamadı.");
      }
    } catch (error) {
      setResetStatus("error");
      setResetMessage("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
    }
  };

  // Modalı kapatırken içini temizle
  const closeModal = () => {
    setIsModalOpen(false);
    setResetEmail("");
    setResetStatus("idle");
    setResetMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/img/admin.png" className="admin-icon" alt="admin" />

        <h2>Admin Paneli</h2>

        <form className="form" onSubmit={handleLogin}>
          <span className="input-span">
            <label className="label">Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adınızı girin"
            />
          </span>

          <span className="input-span">
            <label className="label">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
            />
          </span>

          <span className="span">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true); // Modalı açar
              }}
            >
              Şifremi Unuttum?
            </a>
          </span>

          <button className="submit" type="submit">
            Giriş Yap
          </button>
        </form>
      </div>

      {/* --- ŞİFREMİ UNUTTUM MODALI --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          {/* İçerik tıklandığında modalın kapanmasını engellemek için stopPropagation */}
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            
            <h3>Şifremi Unuttum</h3>

            {resetStatus === "success" ? (
              <div className="msg-success">{resetMessage}</div>
            ) : (
              <form className="form" onSubmit={handleForgotPassword} style={{ marginTop: '15px' }}>
                <p className="modal-desc">
                  Sisteme kayıtlı e-posta adresinizi girin. Size bir sıfırlama bağlantısı göndereceğiz.
                </p>

                <span className="input-span">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="E-posta adresiniz"
                    required
                  />
                </span>

                {resetStatus === "error" && (
                  <div className="msg-error">{resetMessage}</div>
                )}

                <button
                  className="submit"
                  type="submit"
                  disabled={resetStatus === "loading"}
                  style={{ opacity: resetStatus === "loading" ? 0.7 : 1 }}
                >
                  {resetStatus === "loading" ? "Gönderiliyor..." : "Bağlantı Gönder"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;