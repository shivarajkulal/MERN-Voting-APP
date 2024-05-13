import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/LoginForm.css"; // Importing CSS file for styling

const LoginForm = () => {
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", {
        aadharCardNumber,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      const userRole = response.data.role;
      if (userRole === "admin") {
        navigate("/adminDashboard");
      } else if (userRole === "voter") {
        navigate("/userDashboard");
      }
    } catch (error) {
      setError("Invalid Aadhar Card Number or Password");
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="aadharCardNumber">Aadhar Card Number:</label>
          <input
            type="text"
            id="aadharCardNumber"
            value={aadharCardNumber}
            onChange={(e) => setAadharCardNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
