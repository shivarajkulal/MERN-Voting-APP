import React from "react";
import VotingStatistics from "../components/VotingStatistics";
import { useNavigate } from "react-router-dom";
const Home = () => {
      const navigate = useNavigate();

      const goToLogin = () => {
        navigate("/login");
      };

  const goToRegister = () => {
  navigate("/register");
  };
            
  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome to the Voting System</h2>
      <VotingStatistics />
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToRegister}>Register</button>
    </div>
  );
};

export default Home;
