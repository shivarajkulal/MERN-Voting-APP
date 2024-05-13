import React from "react";
import AdminProfile from "../components/AdminProfile";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css"; // Importing CSS file for styling

const Dashboard = () => {
  const navigate = useNavigate();

  const goToCandidateManagement = () => {
    navigate("/candidateManagement");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <AdminProfile />
      <button
        className="candidate-management-btn"
        onClick={goToCandidateManagement}
      >
        Go to Candidate Management
      </button>
    </div>
  );
};

export default Dashboard;
