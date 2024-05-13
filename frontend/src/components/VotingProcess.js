import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/VotingProcess.css"; // Import CSS file

const VotingProcess = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/candidate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch candidates!");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const castVote = async (candidateId) => {
    if (candidateId) {
      try {
        const token = localStorage.getItem("token");
        await api.get(`/candidate/vote/${candidateId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCandidates();
      } catch (error) {
        console.error("Failed to cast vote:", error);
        setError("Failed to cast vote. Please try again.");
      }
    } else {
      setError("Invalid candidate ID.");
    }
  };

  const navigate = useNavigate(); // Use the useNavigate hook

  const viewVotingResult = () => {
    navigate("/"); // Navigate to the VotingResult page
  };

  return (
    <div className="voting-process-container">
      <h2 className="voting-process-heading">Voting Process</h2>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <p className="loading-message">Loading candidates...</p>
      ) : (
        <>
          <h3>List of Candidates:</h3>
          <ul className="candidate-list">
            {candidates.map((candidate) => (
              <li key={candidate._id} className="candidate-item">
                {candidate.name} - {candidate.party}
                <button
                  disabled={!candidate._id}
                  onClick={() => castVote(candidate._id)}
                  className="vote-button"
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
          <button onClick={viewVotingResult} className="view-result-button">
            View Voting Result
          </button>{" "}
          {/* Add this button */}
        </>
      )}
    </div>
  );
};

export default VotingProcess;
