
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/requests");
        setRequests(res.data || []);
      } catch (e) {
        setErr(e.response?.data?.message || "Failed to load requests");
      }
    };
    load();
  }, []);

 
  const autoMatch = async (requestId) => {
    try {
      const res = await api.post("/recipient/match", { requestId });
      const updated = res.data.request;
      alert(res.data.message);
      setRequests((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    } catch (e) {
      alert(e.response?.data?.message || "Auto-match failed");
    }
  };

  
  const updateStatus = async (requestId, status) => {
    try {
      const res = await api.put(`/recipient/request/${requestId}`, { status });
      const updated = res.data.request;
      setRequests((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
    } catch (e) {
      alert(e.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content" style={{ marginTop: "5rem", padding: 20 }}>
        <h2>Manage Requests</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}

        {requests.length === 0 ? (
          <p>No requests found.</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {requests.map((r) => (
              <div key={r._id} className="card">
                <p>
                  <strong>{r.recipient?.name || "Unknown"}</strong> · {r.bloodGroup} ·{" "}
                  {r.location} <br />
                  Status: <b>{r.status}</b>{" "}
                  {r.matchedDonor && (
                    <span style={{ color: "green" }}>
                      → Donor: {r.matchedDonor.name || r.matchedDonor._id}
                    </span>
                  )}
                </p>

                <div style={{ marginTop: 8 }}>
                  <button
                    className="auth-button"
                    onClick={() => autoMatch(r._id)}
                  >
                    Auto-Match Donor
                  </button>

                  <button
                    className="auth-button"
                    onClick={() => updateStatus(r._id, "Completed")}
                    style={{ background: "#28a745", marginLeft: 8 }}
                  >
                    Complete
                  </button>

                  <button
                    className="auth-button"
                    onClick={() => updateStatus(r._id, "Rejected")}
                    style={{ background: "#ff6b6b", marginLeft: 8 }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRequests;
