import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser || currentUser.role !== "admin") {
    return <p style={{ textAlign: "center" }}>Access Denied. Admins only.</p>;
  }

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #87CEFA, #ffffff)",
        padding: "20px",
      }}
    >
      
      <div
        style={{
          padding: "40px",
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
          maxWidth: "500px",
        }}
      >
        <h1>Welcome, {currentUser.name}!</h1>
        <p style={{ margin: "15px 0", color: "#555" }}>
          You are logged in as an <b>Admin</b>. <br />
          From here, you can manage users, blood requests, and alerts.
        </p>
      </div>

      
      <div style={{ marginTop: "25px", display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={() => navigate("/manage-users")}
          style={btnStyle}
        >
          Manage Users
        </button>

        <button
          onClick={() => navigate("/manage-requests")}
          style={btnStyle}
        >
          Manage Requests
        </button>

        <button
          onClick={() => navigate("/reports")}
          style={btnStyle}
        >
          View Reports
        </button>

        <button
          onClick={() => navigate("/alert")}
          style={btnStyle}
        >
          Send Emergency Alert
        </button>

        <button
          onClick={() => navigate("/alert-history")}
          style={btnStyle}
        >
          View Alert History
        </button>
      </div>
    </div>
  );
};

const btnStyle = {
  padding: "10px 20px",
  backgroundColor: "#0077b6",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background 0.3s",
};

export default AdminDashboard;
