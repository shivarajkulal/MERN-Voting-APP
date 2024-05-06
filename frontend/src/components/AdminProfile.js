import React, { useState, useEffect } from "react";
import api from "../services/api";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get("/user/profile");
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Admin Profile</h2>
      <p>Name: {adminData.name}</p>
      <p>Email: {adminData.email}</p>
    </div>
  );
};

export default AdminProfile;
