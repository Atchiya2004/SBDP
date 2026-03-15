import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setShowResend(false);

    try {
      await login({ email, password });
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate("/profile"), 800);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      setError(msg);

      
      if (msg.includes("verify your email")) {
        setShowResend(true);
      }
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.post("/auth/resend-verification", { email });
      setSuccess(res.data.message || "Verification email sent. Check your inbox!");
      setShowResend(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend verification email");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="center-box">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", paddingRight: "35px" }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#b30000",
                fontSize: "18px",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <input type="submit" value="Login" />
        </form>

        {showResend && (
          <button
            onClick={handleResendVerification}
            disabled={resendLoading}
            style={{
              marginTop: "10px",
              padding: "8px 15px",
              backgroundColor: "#0077b6",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {resendLoading ? "Sending..." : "Resend Verification Email"}
          </button>
        )}

        <p style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
