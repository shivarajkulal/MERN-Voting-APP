import React, { useState, useEffect } from "react";
import api from "../services/api";

const VoteResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVoteResults = async () => {
      try {
        // Assuming you have a way to get the token, e.g., from localStorage
        const token = localStorage.getItem("token"); // Adjust this line if your token storage method is different
        const response = await api.get("/candidate/vote/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(response.data);
      } catch (error) {
        setError("Failed to fetch vote results");
      }
    };
    fetchVoteResults();
  }, []);

  return (
    <div>
      <h3>Vote Results</h3>
      {error && <div className="error">{error}</div>}
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            {result.party}: {result.count} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoteResults;
