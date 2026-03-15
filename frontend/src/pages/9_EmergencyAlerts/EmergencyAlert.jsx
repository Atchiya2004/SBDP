import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const EmergencyAlert = () => {
  const [form, setForm] = useState({
    location: "",
    bloodGroup: "O+",
    message: "",
  });
  const [msg, setMsg] = useState("");
  const [alerts, setAlerts] = useState([]);

 
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  
  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/alert/send", {
        location: form.location,
        bloodGroup: form.bloodGroup,
        message: form.message,
      });
      setMsg("🚨 Emergency alert sent successfully!");
      setForm({ location: "", bloodGroup: "O+", message: "" });
      fetchAlerts(); 
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Failed to send alert");
    }
  };

  const fetchAlerts = async () => {
    try {
      const res = await api.get("/alert/history");
      setAlerts(res.data || []);
    } catch (err) {
      console.error("Error fetching alerts:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #87CEFA, #ffffff)",
        padding: "40px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#b30000" }}>
          🚨 Emergency Alert
        </h2>
        {msg && (
          <p style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>
            {msg}
          </p>
        )}

        <form
          onSubmit={submit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <label>Location / Hospital</label>
          <input
            name="location"
            placeholder="Enter hospital or area"
            value={form.location}
            onChange={handle}
            required
            style={inputStyle}
          />

          <label>Blood Group</label>
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handle}
            style={inputStyle}
          >
            <option>O+</option>
            <option>O-</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          <label>Message (optional)</label>
          <input
            name="message"
            placeholder="Short message"
            value={form.message}
            onChange={handle}
            style={inputStyle}
          />

          <button
            className="auth-button"
            type="submit"
            style={{
              backgroundColor: "#b30000",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Send Emergency Alert
          </button>
        </form>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          marginTop: "50px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#b30000" }}>
          📋 Recent Emergency Alerts
        </h2>

        {alerts.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "10px", color: "#666" }}>
            No emergency alerts sent yet.
          </p>
        ) : (
          <div style={{ overflowX: "auto", marginTop: "20px" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "16px",
              }}
            >
              <thead style={{ backgroundColor: "#b30000", color: "white" }}>
                <tr>
                  <th style={thStyle}>Date & Time</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Blood Group</th>
                  <th style={thStyle}>Message</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((a) => (
                  <tr key={a._id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={tdStyle}>
                      {new Date(a.createdAt).toLocaleString()}
                    </td>
                    <td style={tdStyle}>{a.location}</td>
                    <td style={tdStyle}>{a.bloodGroup}</td>
                    <td style={tdStyle}>{a.message || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};


const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "15px",
};

const thStyle = {
  padding: "12px",
  textAlign: "left",
  borderBottom: "2px solid #fff",
};

const tdStyle = {
  padding: "10px",
  textAlign: "left",
  color: "#333",
};

export default EmergencyAlert;
