
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [menuOpenIndex, setMenuOpenIndex] = useState(null); 
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/donor/history");
        setDonations(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load donation history");
      }
    };
    load();
  }, []);

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this donation?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await api.delete(`/donor/history/${id}`);
      setDonations(donations.filter((d) => d._id !== id));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || "Failed to delete donation");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div
      className="main-content"
      style={{
        minHeight: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "20px",
        background: "linear-gradient(to bottom, #87CEFA, #ffffff)"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Donation History</h2>
        {donations.length === 0 ? (
          <p style={{ textAlign: "center", color: "#555" }}>No donations recorded yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#0077b6", color: "#fff" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Blood Group</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Location</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Status</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id || index} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>
                    {donation.date
  ? new Date(donation.date).toLocaleDateString()
  : new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "10px" }}>{donation.bloodGroup}</td>
                  <td style={{ padding: "10px" }}>{donation.location}</td>
                  <td style={{ padding: "10px" }}>{donation.status}</td>
                  <td style={{ padding: "10px", position: "relative" }}>
                    
                    <span
                      style={{ cursor: "pointer", fontWeight: "bold", fontSize: "18px" }}
                      onClick={() => setMenuOpenIndex(menuOpenIndex === index ? null : index)}
                    >
                      &#x22EE;
                    </span>

                    
                    {menuOpenIndex === index && (
                      <div
                        style={{
                          position: "absolute",
                          top: "25px",
                          right: "0",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          borderRadius: "5px",
                          zIndex: 10
                        }}
                      >
                        <button
                          onClick={() => handleDelete(donation._id)}
                          disabled={loading}
                          style={{
                            padding: "8px 15px",
                            background: "red",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "100%"
                          }}
                        >
                          {loading ? "Deleting..." : "Delete"}
                        </button>
                      </div>
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

export default DonationHistory;
