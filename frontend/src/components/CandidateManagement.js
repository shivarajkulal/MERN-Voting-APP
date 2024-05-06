import React, { useState, useEffect } from "react";
import api from "../services/api";
import VoteResults from "./VoteResults"; // Import VoteResults component

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await api.get("/candidate");
      setCandidates(response.data);
    } catch (error) {
      setError("Failed to fetch candidates");
    }
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/candidate", { name, party, age });
      alert("Candidate added successfully");
      fetchCandidates();
      setName("");
      setParty("");
      setAge("");
    } catch (error) {
      setError("Failed to add candidate. Please try again.");
    }
  };

  const handleUpdateCandidate = async (candidateId, updatedCandidate) => {
    try {
      await api.put(`/candidate/${candidateId}`, updatedCandidate);
      alert("Candidate updated successfully");
      fetchCandidates();
    } catch (error) {
      setError("Failed to update candidate. Please try again.");
    }
  };

  const handleDeleteCandidate = async (candidateId) => {
    try {
      await api.delete(`/candidate/${candidateId}`);
      alert("Candidate deleted successfully");
      fetchCandidates();
    } catch (error) {
      setError("Failed to delete candidate. Please try again.");
    }
  };

  return (
    <div>
      <h2>Candidate Management</h2>
      <h1>
        <VoteResults />
      </h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleAddCandidate}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="party">Party:</label>
          <input
            type="text"
            id="party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Candidate</button>
      </form>

      <h3>Candidates List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.age}</td>
              <td>
                <button
                  onClick={() =>
                    handleUpdateCandidate(candidate._id, {
                      /* Updated candidate data */
                    })
                  }
                >
                  Update
                </button>
                <button onClick={() => handleDeleteCandidate(candidate._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateManagement;
