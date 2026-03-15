
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const AlertHistory = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await api.get("/alert/history");
        setAlerts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load alert history");
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading alert history...</p>;
  if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;

  return (
    <div
      style={{
        minHeight: "80vh",
        background: "linear-gradient(to bottom, #87CEFA, #ffffff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Emergency Alert History</h2>

        {alerts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No alerts found.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#0077b6", color: "#fff" }}>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Blood Group</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Message</th>
                <th style={thStyle}>Created By</th>
                <th style={thStyle}>Seen Donors</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={tdStyle}>{new Date(alert.createdAt).toLocaleString()}</td>
                  <td style={tdStyle}>{alert.bloodGroup}</td>
                  <td style={tdStyle}>{alert.location}</td>
                  <td style={tdStyle}>{alert.message || "—"}</td>
                  <td style={tdStyle}>
                    {alert.createdBy?.name || "Admin"} <br />
                    <span style={{ fontSize: "12px", color: "#777" }}>
                      {alert.createdBy?.email}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {alert.seenBy?.length > 0 ? (
                      <ul style={{ margin: 0, paddingLeft: "20px" }}>
                        {alert.seenBy.map((donor) => (
                          <li key={donor._id}>
                            {donor.name} ({donor.email})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: "gray" }}>Not yet seen</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  fontWeight: "bold",
  textAlign: "center",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
  verticalAlign: "top",
};

export default AlertHistory;
