
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "../../api/axios";

const AlertSeen = () => {
  const { id } = useParams(); 
  const [searchParams] = useSearchParams();
  const donorId = searchParams.get("donor"); 
  const [status, setStatus] = useState("Recording your response...");

  useEffect(() => {
    const markSeen = async () => {
      try {
        await api.post("/alert/seen", { alertId: id, donorId });
        setStatus("Thank you! Your response has been recorded.");
      } catch (err) {
        console.error(err);
        setStatus("Failed to record your response.");
      }
    };
    markSeen();
  }, [id, donorId]);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #ffcccc, #fff)",
        textAlign: "center",
      }}
    >
      <h2>{status}</h2>
      <p style={{ color: "#555", marginTop: "10px" }}>
        You can close this page now.
      </p>
    </div>
  );
};

export default AlertSeen;
