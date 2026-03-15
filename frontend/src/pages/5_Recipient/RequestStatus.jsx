import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const res = await api.get("/recipient/status");
      setRequests(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const cancelRequest = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this blood request?")) return;
    try {
      await api.delete(`/recipient/request/${id}`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      alert("Request cancelled successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel request");
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        paddingTop: "10px", 
        paddingBottom: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "90%",
          maxWidth: "900px",
          marginTop: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#b30000",
            marginBottom: "25px",
          }}
        >
          🩸 My Blood Requests
        </h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading your requests...</p>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : requests.length === 0 ? (
          <p style={{ textAlign: "center" }}>No requests found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "#fff",
                borderRadius: "10px",
              }}
            >
              <thead style={{ background: "#b30000", color: "white" }}>
                <tr>
                  <th style={th}>Blood Group</th>
                  <th style={th}>Location</th>
                  <th style={th}>Status</th>
                  <th style={th}>Matched Donor</th>
                  <th style={th}>Contact</th>
                  <th style={th}>Date</th>
                  <th style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id}>
                    <td style={td}>{req.bloodGroup}</td>
                    <td style={td}>{req.location}</td>
                    <td style={{ ...td, color: getStatusColor(req.status) }}>
                      {req.status}
                    </td>
                    <td style={td}>
                      {req.matchedDonor ? req.matchedDonor.name : "—"}
                    </td>
                    <td style={td}>
                      {req.matchedDonor ? req.matchedDonor.email : "—"}
                    </td>
                    <td style={td}>
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td style={td}>
                      {req.status?.toLowerCase() === "pending" ? (
                        <button
                          onClick={() => cancelRequest(req._id)}
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            padding: "6px 14px",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span style={{ color: "#888" }}>—</span>
                      )}
                    </td>
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

const th = {
  padding: "12px",
  border: "1px solid #ddd",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "15px",
};

const td = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
  fontSize: "14px",
};

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "orange";
    case "matched":
      return "green";
    case "completed":
      return "#006400";
    case "rejected":
      return "red";
    default:
      return "black";
  }
};

export default RequestStatus;
