
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return (
      <div className="main-content">
        <div className="center-box">
          <h2>Please log in to access your profile.</h2>
        </div>
      </div>
    );
  }

 
  const getDashboardRoute = () => {
    switch (currentUser.role) {
      case "admin":
        return "/admin";
      case "donor":
        return "/donors";
      case "recipient":
        return "/recipient-dashboard";
      default:
        return "/";
    }
  };

  return (
    <div className="main-content">
      <div className="center-box">
        <h2>Welcome, {currentUser.name}!</h2>
        <br />
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Role:</strong> {currentUser.role}</p>
        <p>You are logged in successfully!</p>
        <br />
        <button onClick={() => navigate(getDashboardRoute())}>
          Go to {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
