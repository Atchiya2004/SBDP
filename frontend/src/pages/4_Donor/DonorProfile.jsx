
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const DonorProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    age: "",
    gender: "",
    dob: "",
    address: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  
  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/donor/profile");
        const donor = res.data.donorInfo || res.data;
        setFormData({
          name: donor.name || "",
          email: donor.email || "",
          phone: donor.phone || "",
          bloodGroup: donor.bloodGroup || "",
          age: donor.age || "",
          gender: donor.gender || "",
          dob: donor.dob ? donor.dob.split("T")[0] : "",
          address: donor.address || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      }
    };
    load();
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/donor/profile", formData);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update");
    }
  };

  const inputStyle = { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" };
  const labelStyle = { fontWeight: "bold", marginBottom: "5px", display: "block" };

  return (
    <div className="main-content" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to bottom, #87CEFA, #ffffff)", padding: "20px" }}>
      <div style={{ width: "100%", maxWidth: "600px", backgroundColor: "#fff", padding: "30px", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>Donor Profile</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleUpdate}>
          <label style={labelStyle}>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />

          <label style={labelStyle}>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />

          <label style={labelStyle}>Phone</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Blood Group</label>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={inputStyle}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
          </select>

          <label style={labelStyle}>Age</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
            <option value="">Select Gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
          </select>

          <label style={labelStyle}>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} style={{ ...inputStyle, height: "80px" }} />

          {success && <p style={{ color: "green" }}>{success}</p>}
          <input type="submit" value="Update Profile" style={{ width: "100%", padding: "12px", backgroundColor: "#b30000", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }} />
        </form>
      </div>
    </div>
  );
};

export default DonorProfile;
