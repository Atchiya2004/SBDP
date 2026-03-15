
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/admin/users");
        
        const sortedUsers = (res.data || []).sort((a, b) =>
          a.role === "admin" ? -1 : b.role === "admin" ? 1 : 0
        );
        setUsers(sortedUsers);
      } catch (e) {
        setErr(e.response?.data?.message || "Failed to load users");
      }
    };
    load();
  }, []);

  const handleVerify = async (id) => {
    try {
      const res = await api.put(`/admin/user/${id}/verify`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? res.data.user : u)).sort((a, b) =>
          a.role === "admin" ? -1 : b.role === "admin" ? 1 : 0
        )
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/admin/user/${id}`);
      setUsers((prev) =>
        prev.filter((u) => u._id !== id).sort((a, b) =>
          a.role === "admin" ? -1 : b.role === "admin" ? 1 : 0
        )
      );
      alert("User deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Deletion failed");
    }
  };

  return (
    
      <div className="dashboard-content" style={{ marginTop: "5rem", padding: 20 }}>
        <h2>Manage Users</h2>
        {err && <p style={{ color: "red" }}>{err}</p>}

        {users.length === 0 ? (
          <p>No registered users.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              background: "white",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#b30000", color: "white" }}>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>Email</th>
                <th style={{ padding: "10px" }}>Role</th>
                <th style={{ padding: "10px" }}>Verified</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ textAlign: "center" }}>
                  <td style={{ padding: "10px" }}>{u.name}</td>
                  <td style={{ padding: "10px" }}>{u.email}</td>
                  <td style={{ padding: "10px" }}>{u.role}</td>
                  <td style={{ padding: "10px" }}>{u.isVerified ? "Yes" : "No"}</td>
                  <td style={{ padding: "10px" }}>
                    {u.role !== "admin" ? (
                      <>
                        <button
                          onClick={() => handleVerify(u._id)}
                          style={{
                            background: "#007bff",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            marginRight: "8px",
                            cursor: "pointer",
                          }}
                        >
                          {u.isVerified ? "Unverify" : "Verify"}
                        </button>
                        <button
                          onClick={() => handleDelete(u._id)}
                          style={{
                            background: "#ff4d4d",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <span style={{ color: "gray", fontStyle: "italic" }}>
                        Admin (Protected)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    
  );
};

export default ManageUsers;
