import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./Reset.css";

const Reset = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus("error");
            setMessage("Şifreler eşleşmiyor!");
            return;
        }

        if (!token) {
            setStatus("error");
            setMessage("Geçersiz veya eksik sıfırlama bağlantısı!");
            return;
        }

        setStatus("loading");

        try {
            const response = await axios.post(
                "http://localhost:8080/blog-api/v1/admin/reset-password",
                {
                    token: token,
                    newPassword: password,
                }
            );

            if (response.data === true || response.data === "true") {
                setStatus("success");
                setMessage("Şifreniz başarıyla güncellendi! Giriş sayfasına yönlendiriliyorsunuz...");

                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            } else {
                setStatus("error");
                setMessage("Sıfırlama bağlantısının süresi dolmuş veya daha önce kullanılmış.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-card">
                <h2>Şifre Sıfırlama</h2>
                <p className="subtitle">Yeni şifrenizi belirleyin</p>

                {status === "success" ? (
                    <div style={{ color: "#04AA6D", fontWeight: "bold", padding: "20px" }}>
                        {message}
                    </div>
                ) : (
                    <form className="form" onSubmit={handleReset}>

                        {/* Hata Mesajı Gösterimi */}
                        {status === "error" && (
                            <div style={{ color: "#ef4444", fontSize: "13px", textAlign: "left", marginBottom: "10px" }}>
                                {message}
                            </div>
                        )}

                        <span className="input-span">
                            <label className="label">Yeni Şifre</label>
                            <input
                                type="password"
                                placeholder="Yeni şifreniz"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </span>

                        <span className="input-span">
                            <label className="label">Yeni Şifre (Tekrar)</label>
                            <input
                                type="password"
                                placeholder="Şifreyi tekrar girin"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </span>

                        <button
                            className="submit"
                            type="submit"
                            disabled={status === "loading"}
                            style={{ opacity: status === "loading" ? 0.7 : 1 }}
                        >
                            {status === "loading" ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Reset;