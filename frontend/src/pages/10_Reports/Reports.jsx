
import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../index.css";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await api.get("/reports");
      setReport(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading reports...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "90vh",
        background: "linear-gradient(to bottom, #87CEFA, #ffffff)",
        padding: "50px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          padding: "40px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#b30000" }}>
          📊 System Reports & Statistics
        </h2>

        {report ? (
          <>
           
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "16px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#0077b6", color: "white" }}>
                  <th style={cellStyle}>Metric</th>
                  <th style={cellStyle}>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={cellStyle}>Registered Users</td>
                  <td style={cellStyle}>{report.totalUsers}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Donors</td>
                  <td style={cellStyle}>{report.totalDonors}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Recipients</td>
                  <td style={cellStyle}>{report.totalRecipients}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Requests</td>
                  <td style={cellStyle}>{report.totalRequests}</td>
                </tr>
                <tr>
                  <td style={cellStyle}>Total Donations</td>
                  <td style={cellStyle}>{report.totalDonations}</td>
                </tr>
              </tbody>
            </table>

            
            {report?.bloodGroupStats?.length > 0 && (
              <div style={{ marginTop: "40px" }}>
                <h3 style={{ color: "#0077b6", marginBottom: "15px" }}>
                  🩸 Donations by Blood Group
                </h3>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "16px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#0077b6", color: "white" }}>
                      <th style={cellStyle}>Blood Group</th>
                      <th style={cellStyle}>Donations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.bloodGroupStats.map((b, index) => (
                      <tr key={index}>
                        <td style={cellStyle}>{b._id}</td>
                        <td style={cellStyle}>{b.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <p style={{ textAlign: "center" }}>No report data available.</p>
        )}
      </div>
    </div>
  );
};


const cellStyle = {
  padding: "12px 16px",
  border: "1px solid #ddd",
  textAlign: "left",
};

export default Reports;
