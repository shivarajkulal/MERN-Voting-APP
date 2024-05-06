import React, { useState, useEffect } from "react";
import api from "../services/api";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [hasVoted, setHasVoted] = useState(false); // New state variable for voting status

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);

        // Fetch the user's voting status
        const votingStatusResponse = await api.get("/user/voting-status", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHasVoted(votingStatusResponse.data.hasVoted);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to fetch user profile");
      }
    };
    fetchUserProfile();
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(
        "/user/profile/password",
        {
          currentPassword: password,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password updated successfully");
      setPassword("");
      setNewPassword("");
    } catch (error) {
      setError(
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Failed to update password. Please try again later."
      );
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
        <p>Aadhar Card Number: {user.aadharCardNumber}</p>
        <p>Voting Status: {hasVoted ? "Voted" : "Not Voted"}</p>{" "}
        <form onSubmit={handlePasswordUpdate}>
          <div>
            <label htmlFor="currentPassword">Current Password:</label>
            <input
              type="password"
              id="currentPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
