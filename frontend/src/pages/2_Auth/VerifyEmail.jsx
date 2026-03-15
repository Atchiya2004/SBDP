import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const [msg, setMsg] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/auth/verify-email/${id}/${token}`
        );

        setMsg(res.data.message || "Email verified successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setMsg(err.response?.data?.message || "Invalid or expired link");
      }
    };

    verify();
  }, [id, token, navigate]);

  return (
    <div className="center-box">
      <h2>Email Verification</h2>
      <p>{msg}</p>
    </div>
  );
};

export default VerifyEmail;
