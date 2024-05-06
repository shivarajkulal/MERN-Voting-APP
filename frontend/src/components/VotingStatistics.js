import React, { useState, useEffect } from "react";
import api from "../services/api";
import CandidateList from "./CandidateList"; // Import CandidateList component

const VotingStatistics = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get("/candidate");
        setCandidates(response.data);
      } catch (error) {
        setError("Failed to fetch voting statistics");
      }
    };
    fetchCandidates();
  }, []);

  return (
    <div>
      <h2>Voting Statistics</h2>
      {error && <div className="error">{error}</div>}
      <table>
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

      {/* Display features for non-logged-in users */}
      <div>
        <h3>Candidate Information</h3>
        <ul>
          <li>
            <p>CandidateList component</p>
            <CandidateList />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VotingStatistics;
