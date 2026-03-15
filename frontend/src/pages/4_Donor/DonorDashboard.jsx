
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const [showForm, setShowForm] = useState(false);
  const [donationData, setDonationData] = useState({
    date: "",
    bloodGroup: "",
    quantity: "",
    centre: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setDonationData({ ...donationData, [e.target.name]: e.target.value });
  };

  const handleAddDonation = async (e) => {
    e.preventDefault();
    try {
      
      const payload = {
        location: donationData.centre || donationData.location || "Unknown",
        status: "Completed",
        date: donationData.date,
      };
      await api.post("/donor/add-record", payload);
      setMsg("Donation recorded successfully!");
      setDonationData({ date: "", bloodGroup: "", quantity: "", centre: "" });
      setShowForm(false);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to record donation");
    }
  };

  if (!currentUser) return null;

  return (
    <div style={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", background: "linear-gradient(to bottom, #87CEFA, #ffffff)", padding: "20px" }}>
      <div style={{ padding: "40px", backgroundColor: "rgba(255,255,255,0.95)", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)", textAlign: "center", maxWidth: "500px" }}>
        <h1>Welcome to Donor Dashboard!</h1><br/>
        <p>Thank you for your valuable contribution.</p>
      </div>

      <div style={{ marginTop: "25px", display: "flex", gap: "15px" }}>
        <button onClick={() => navigate("/donor-profile")} style={btnStyle}>Profile</button>
        <button onClick={() => navigate("/donor-history")} style={btnStyle}>Donation History</button>
        <button onClick={() => setShowForm(!showForm)} style={btnStyle}>Record Donation</button>
      </div>

      {msg && <p style={{ color: "green", marginTop: 12 }}>{msg}</p>}

      {showForm && (
        <form onSubmit={handleAddDonation} style={{ marginTop: "20px", background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.2)", width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <label>Date of Donation</label>
          <input type="date" name="date" value={donationData.date} onChange={handleChange} required />

          <label>Blood Group</label>
          <select name="bloodGroup" value={donationData.bloodGroup} onChange={handleChange} required>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
          </select>


          <label>Donation Centre</label>
          <input type="text" name="centre" value={donationData.centre} onChange={handleChange} placeholder="Enter donation centre" required />

          <input type="submit" value="Save Donation" style={{ backgroundColor: "#b30000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", padding: "10px", fontWeight: "bold" }} />
        </form>
      )}
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
};

export default DonorDashboard;
