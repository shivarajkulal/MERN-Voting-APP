import React, { useState, useEffect } from "react";
import api from "../services/api";

const VotingProcess = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  // Function to retrieve list of candidates
  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the authentication token from localStorage
      const response = await api.get("/candidate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(response.data);
    } catch (error) {
      setError("Failed to fetch candidates");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Function to cast vote for a candidate
  const castVote = async (candidateId) => {
    try {
      const token = localStorage.getItem("token"); // Get the authentication token from localStorage
      await api.post(`/candidate/vote/${candidateId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Optionally, you can fetch updated candidate list after voting
      fetchCandidates();
      // Show success message or handle UI accordingly
    } catch (error) {
      setError("Failed to cast vote. Please try again.");
    }
  };

  return (
    <div>
      <h2>Voting Process</h2>
      {error && <div className="error">{error}</div>}
      <h3>List of Candidates:</h3>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate._id}>
            {candidate.name} - {candidate.party}
            <button onClick={() => castVote(candidate._id)}>Vote</button>
          </li>
        ))}
      </ul>
      {/* Optionally, display vote count for each candidate */}
    </div>
  );
};

export default VotingProcess;
