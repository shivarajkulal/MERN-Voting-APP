import React from "react";
import UserProfile from "../components/UserProfile";
import { useNavigate } from "react-router-dom";
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
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <UserProfile />
      <button onClick={goToVotingProcess}>Go to Voting Process</button>
    </div>
  );
};

export default Dashboard;
