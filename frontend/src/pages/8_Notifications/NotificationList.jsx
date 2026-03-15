
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../index.css";

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch {
      alert("Failed to update notification status");
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch {
      alert("Failed to mark all as read");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading notifications...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #87CEFA, #ffffff)",
        padding: "40px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#b30000", marginBottom: "30px" }}>
        🔔 Notifications
      </h1>

      <button
        onClick={markAllAsRead}
        style={{
          backgroundColor: "#b30000",
          color: "white",
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        Mark All as Read
      </button>

      {notifications.length === 0 ? (
        <p style={{ textAlign: "center" }}>No notifications yet.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#0077b6", color: "#fff" }}>
              <th style={cellHeader}>Type</th>
              <th style={cellHeader}>Message</th>
              <th style={cellHeader}>Date</th>
              <th style={cellHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n._id}>
                <td style={cell}>{n.type.toUpperCase()}</td>
                <td style={cell}>{n.message}</td>
                <td style={cell}>
                  {new Date(n.createdAt).toLocaleString()}
                </td>
                <td style={cell}>
                  {n.read ? (
                    "✅ Read"
                  ) : (
                    <button
                      onClick={() => markAsRead(n._id)}
                      style={{
                        backgroundColor: "#0077b6",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const cellHeader = {
  padding: "12px",
  textAlign: "center",
  border: "1px solid #ccc",
};

const cell = {
  padding: "12px",
  textAlign: "center",
  border: "1px solid #ccc",
};

export default NotificationList;
