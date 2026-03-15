import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      style={{
        minHeight: "10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
        flexDirection: "column",
        padding: "20px",
      }}
    >
      
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "30px" }}>
        Smart Blood Donation Portal
      </h1>

      
      <div
        style={{
          padding: "40px",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
          maxWidth: "450px",
        }}
      >
        <h2>Welcome to Our Community!</h2>
        <p style={{ margin: "15px 0", color: "#555" }}>
          Donate blood, save lives, and be a part of something meaningful.
        </p>
        <blockquote style={{ fontStyle: "italic", color: "#888" }}>
          "The gift of blood is the gift of life."
        </blockquote>

        
        
      </div>
    </div>
  );
};

export default Dashboard;
