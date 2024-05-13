import React from "react";
import VotingStatistics from "../components/VotingStatistics";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css"; // Importing CSS file for styling

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Home Page</h1>
      <h2 className="home-subtitle">Welcome to the Voting System</h2>
      <VotingStatistics />
      <div className="button-container">
        <button className="login-button" onClick={goToLogin}>
          Login
        </button>
        <button className="register-button" onClick={goToRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Home;
