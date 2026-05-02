import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Admin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("auth");

    if (!isAdmin) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <p>Dashboard</p>
    </div>
  );
};

export default Admin;