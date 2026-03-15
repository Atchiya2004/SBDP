import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const register = async (userData) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
  };

  const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    const token = res.data.token;

    localStorage.setItem("token", token);

    const profile = await api.get("/auth/profile");
    setCurrentUser(profile.data);
    localStorage.setItem("currentUser", JSON.stringify(profile.data));

    return profile.data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    window.location.href = "/login";
  };

  const fetchProfile = async () => {
    const res = await api.get("/auth/profile");
    setCurrentUser(res.data);
    localStorage.setItem("currentUser", JSON.stringify(res.data));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !currentUser) fetchProfile().catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout, fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
