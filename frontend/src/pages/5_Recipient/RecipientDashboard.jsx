import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const RecipientDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  
  if (!currentUser) {
    return <p style={{ textAlign: "center" }}>Please log in first.</p>;
  }

  if (currentUser.role !== "recipient") {
    return <p style={{ textAlign: "center", color: "red" }}>Access Denied. Recipients only.</p>;
  }

  
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/recipient/status");
        setRequests(res.data || []);
      } catch (error) {
        setErr(error.response?.data?.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const total = requests.length;
  const pending = requests.filter(r => r.status === "Pending").length;
  const matched = requests.filter(r => r.status === "Matched").length;
  const completed = requests.filter(r => r.status === "Completed").length;

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading recipient dashboard...</p>;
  }

  return (
    
      <div className="dashboard-content" style={{ marginTop: "5rem", padding: "20px" }}>
        <h2>Welcome, {currentUser.name}!</h2>
        <p>Here’s your blood request summary:</p>

        {err && <p style={{ color: "red" }}>{err}</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <div className="card"><h3>Total Requests</h3><p>{total}</p></div>
          <div className="card"><h3>Pending</h3><p>{pending}</p></div>
          <div className="card"><h3>Matched</h3><p>{matched}</p></div>
          <div className="card"><h3>Completed</h3><p>{completed}</p></div>
        </div>

        <div style={{ marginTop: "30px", display: "flex", gap: "15px", justifyContent: "center" }}>
          <button className="auth-button" onClick={() => navigate("/request-blood")}>
            Request Blood
          </button>
          <button className="auth-button" onClick={() => navigate("/request-status")}>
            View Status
          </button>
          <button
            className="auth-button"
            style={{ background: "#888" }}
            onClick={() => navigate("/profile")}
          >
            Back to Profile
          </button>
        </div>
      </div>
   
  );
};

export default RecipientDashboard;
