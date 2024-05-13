import React, { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/AdminProfile.css";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await api.get("/user/profile", config);
        setAdminData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch admin profile");
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="admin-profile-container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="admin-profile-container error-text">Error: {error}</div>
    );
  }

  return (
    <div className="admin-profile-container">
      <h2>Admin Profile</h2>
      <div className="profile-info">
        <p>Name: {adminData.user.name}</p>
        <p>Email: {adminData.user.email}</p>
      </div>
    </div>
  );
};

export default AdminProfile;
