import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Search() {
  const [query, setQuery] = useState("");
  const [field, setField] = useState("name");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false); 
  
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search query.");
      return;
    }
    setLoading(true);
    setError(null);
    setSearched(true); 

    try {
      const response = await axios.get(`http://localhost:3000/contacts/search?query=${query}&field=${field}`);
      setResults(response.data);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-3xl mb-4">Search Contacts</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
          placeholder="Search..."
        />
        <select
          value={field}
          onChange={(e) => setField(e.target.value)}
          className="select select-bordered ml-2"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <button
          onClick={handleSearch}
          className="btn btn-primary ml-2"
        >
          Search
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {searched && ( 
        results.length > 0 ? (
          <div>
            {results.map((contact) => (
              <div key={contact._id} className="card w-60 bg-base-100 shadow-xl mb-4">
                <div className="card-body">
                  <h2 className="card-title">{contact.name}</h2>
                  <p>{contact.email}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No results found.</div>
        )
      )}
      <button
        onClick={() => navigate("/")}
        className="btn btn-secondary mb-4"
      >
        Back to All Contacts
      </button>
    </div>
  );
}

export default Search;
