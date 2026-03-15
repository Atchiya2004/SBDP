
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="navbar" style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.title}>Smart Blood Donation Portal</span>
      </div>

      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>

        {!currentUser ? (
          <>
            <li><Link to="/register" style={styles.link}>Register</Link></li>
            <li><Link to="/login" style={styles.link}>Login</Link></li>
          </>
        ) : (
          <>
            
            {currentUser.role === "donor" && (
              <>
                <li><Link to="/donors" style={styles.link}>Dashboard</Link></li>
                <li><Link to="/donor-history" style={styles.link}>My Donations</Link></li>
                <li><Link to="/leaderboard" style={styles.link}>Leaderboard</Link></li>
                <li><Link to="/awareness" style={styles.link}>Awareness</Link></li>
              </>
            )}

            
            {currentUser.role === "recipient" && (
              <>
                <li><Link to="/recipient-dashboard" style={styles.link}>Dashboard</Link></li>
                <li><Link to="/request-blood" style={styles.link}>Request Blood</Link></li>
                <li><Link to="/request-status" style={styles.link}>My Requests</Link></li>
                

              </>
            )}

           
            {currentUser.role === "admin" && (
              <>
                <li><Link to="/admin" style={styles.link}>Admin</Link></li>
                <li><Link to="/manage-requests" style={styles.link}>Requests</Link></li>
                <li><Link to="/manage-users" style={styles.link}>Users</Link></li>
                <li><Link to="/alert" style={styles.link}>Alerts</Link></li>
                <li><Link to="/reports" style={styles.link}>Reports</Link></li>
              </>
            )}

            <li><Link to="/notifications" style={styles.link}>🔔 Notifications</Link></li>
            <li><Link to="/profile" style={styles.link}>Profile</Link></li>
            <li><button onClick={logout} style={styles.logoutBtn}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#b30000",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    fontWeight: "bold",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  title: {
    fontSize: "18px",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
  logoutBtn: {
    backgroundColor: "#fff",
    color: "#b30000",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
