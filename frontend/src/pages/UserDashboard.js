import React from "react";
import UserProfile from "../components/UserProfile";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css"; // Importing CSS file for styling

const Dashboard = () => {
  const navigate = useNavigate();

  const goToVotingProcess = () => {
    navigate("/votingProcess");
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
      <UserProfile />
      <button className="voting-process-btn" onClick={goToVotingProcess}>
        Go to Voting Process
      </button>
    </div>
  );
};

export default Dashboard;
