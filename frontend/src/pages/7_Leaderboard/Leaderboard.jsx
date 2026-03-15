
import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const Leaderboard = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await api.get("/donor/leaderboard");
      setDonors(res.data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div
      style={{
        minHeight: "90vh",
        background: "linear-gradient(to bottom, #fff5f5, #fff)",
        padding: "40px",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#b30000" }}>🏆 Top Donors Leaderboard</h1>
      <table
        style={{
          width: "90%",
          margin: "30px auto",
          borderCollapse: "collapse",
          fontSize: "16px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#b30000", color: "#fff" }}>
            <th style={cell}>Rank</th>
            <th style={cell}>Name</th>
            <th style={cell}>Email</th>
            <th style={cell}>Blood Group</th>
            <th style={cell}>Total Donations</th>
            <th style={cell}>Last Donation Date</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor, i) => (
            <tr key={donor._id} style={{ backgroundColor: i % 2 ? "#f9f9f9" : "#fff" }}>
              <td style={cell}>{i + 1}</td>
              <td style={cell}>{donor.name}</td>
              <td style={cell}>{donor.email}</td>
              <td style={cell}>{donor.bloodGroup}</td>
              <td style={cell}>{donor.totalDonations}</td>
              <td style={cell}>
                {donor.lastDonation
                  ? new Date(donor.lastDonation).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cell = {
  padding: "10px",
  border: "1px solid #ddd",
  textAlign: "center",
};

export default Leaderboard;
