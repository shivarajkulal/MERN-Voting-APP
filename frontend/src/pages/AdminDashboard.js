import React from "react";
import AdminProfile from "../components/AdminProfile";
import { useNavigate } from "react-router-dom";
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
    <div>
      <h2>Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
      <AdminProfile />
      <button onClick={goToCandidateManagement}>Go to Voting Process</button>
    </div>
  );
};

export default Dashboard;
