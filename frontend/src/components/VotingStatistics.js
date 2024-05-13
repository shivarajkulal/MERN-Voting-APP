import "../styles/VotingStatistics.css"; // Importing CSS file for styling
import React, { useEffect, useState } from "react";
import api from "../services/api";


const VotingStatistics = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        api.setToken(localStorage.getItem("token"));
        const response = await api.get("/candidate");
        setCandidates(response.data);
      } catch (error) {
        setError("Failed to fetch voting statistics");
        console.error(error);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <div className="voting-stats-container">
      <h2>Voting Statistics</h2>
      {error && <div className="error">{error}</div>}
      <div className="table-container">
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Candidate Name</th>
              <th>Party</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.name}</td>
                <td>{candidate.party}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VotingStatistics;
