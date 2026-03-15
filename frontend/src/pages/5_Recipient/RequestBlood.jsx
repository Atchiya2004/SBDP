import React, { useState } from "react";
import api from "../../api/axios";

const RequestBlood = () => {
  const [form, setForm] = useState({
    bloodGroup: "A+",
    units: 1,
    hospital: "",
    reason: "",
  });
  const [msg, setMsg] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await api.post("/recipient/request", {
        bloodGroup: form.bloodGroup,
        location: form.hospital || form.reason || "Unknown",
      });
      setMsg("✅ Blood request submitted successfully.");
      setForm({ bloodGroup: "A+", units: 1, hospital: "", reason: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Failed to submit request");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8f9fa, #ffe6e6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#b30000",
            marginBottom: "30px",
          }}
        >
          🩸 Request Blood
        </h1>

        {msg && (
          <p
            style={{
              textAlign: "center",
              color: msg.includes("✅") ? "green" : "red",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {msg}
          </p>
        )}

        <form onSubmit={submit}>
          <table
            style={{
              width: "100%",
              borderSpacing: "20px",
            }}
          >
            <tbody>
              <tr>
                <td style={labelStyle}>Hospital / Location</td>
                <td>
                  <input
                    type="text"
                    name="hospital"
                    placeholder="Enter hospital or location"
                    value={form.hospital}
                    onChange={handle}
                    required
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={labelStyle}>Blood Group</td>
                <td>
                  <select
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handle}
                    style={inputStyle}
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td style={labelStyle}>Units Required</td>
                <td>
                  <input
                    type="number"
                    name="units"
                    min="1"
                    value={form.units}
                    onChange={handle}
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td style={labelStyle}>Reason (Optional)</td>
                <td>
                  <input
                    type="text"
                    name="reason"
                    placeholder="Reason for request"
                    value={form.reason}
                    onChange={handle}
                    style={inputStyle}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan="2" style={{ textAlign: "center", paddingTop: "20px" }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#b30000",
                      color: "white",
                      padding: "10px 30px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Submit Request
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#333",
  width: "35%",
  textAlign: "right",
  paddingRight: "15px",
  verticalAlign: "middle",
};

export default RequestBlood;
