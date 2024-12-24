import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Fetch candidates from the backend
    axios
      .get("http://localhost:5000/api/candidates")
      .then((response) => {
        console.log("Fetched candidates:", response.data); // Debugging: log fetched data
        setCandidates(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle search
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sorting
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    return sortOrder === "asc"
      ? a.experience - b.experience
      : b.experience - a.experience;
  });

  return (
    <div className="App">
      <h1>Candidate List Viewer</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by Name or Skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
        >
          Sort by Experience ({sortOrder === "asc" ? "Ascending" : "Descending"})
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Skills</th>
            <th>Years of Experience</th>
          </tr>
        </thead>
        <tbody>
          {sortedCandidates.length > 0 ? (
            sortedCandidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.skills}</td>
                <td>{candidate.experience}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No candidates found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
