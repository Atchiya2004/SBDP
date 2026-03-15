import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/register", {
        name, email, password, role, bloodGroup, location
      });
      setSuccess(res.data.message);
      setError("");
      setName(""); setEmail(""); setPassword(""); setRole("donor"); setBloodGroup(""); setLocation("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="center-box">
        <h1>Create Account</h1>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <div style={{ position: "relative" }}>
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", paddingRight: "35px" }} />
            <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#b30000", fontSize: "18px" }}>{showPassword ? "Hide" : "Show"}</span>
          </div>

          <input type="text" placeholder="Blood Group (e.g., A+)" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required />
          <input type="text" placeholder="Location (e.g., Chennai)" value={location} onChange={(e) => setLocation(e.target.value)} required />

          <label style={{ marginTop: "10px", fontWeight: "bold", textAlign: "left" }}>Register As</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="donor">Donor</option>
            <option value="recipient">Recipient</option>
            <option value="admin">Admin</option>
          </select>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <input type="submit" value={loading ? "Registering..." : "Register"} disabled={loading} />
        </form>

        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
