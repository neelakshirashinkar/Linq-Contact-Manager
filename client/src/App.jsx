import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import ThemeController from "./components/ThemeController";
import Search from "./components/Search";
import AllContacts from "./components/AllContacts";
import "./index.css";
import axios from "axios";

const App = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "" });
  const handleAddContact = async () => {
    try {
      const response = await axios.post("http://localhost:3000/contacts", newContact);
      setShowAddModal(false);
      setNewContact({ name: "", email: "" });
      window.location.reload(); 
    } catch (err) {
      alert("Failed to add contact. Please try again.");
    }
  };

  return (
    <div>
      <Router>  
      <nav className="flex justify-between items-center navbar bg-neutral text-neutral-content px-4">
        <h1 className="text-white text-2xl font-bold">Linq Contact Manager</h1>
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <button className="btn btn-active btn-accent">Search</button>
          </Link>
          <button
            className="btn btn-active btn-accent"
            onClick={() => setShowAddModal(true)}
          >
            Add Contact
          </button>
          <ThemeController />
        </div>
      </nav>
      <Routes>
          <Route path="/" element={<AllContacts />} />
          <Route path="/search" element={<Search />} />
      </Routes>
    </Router>

 
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Add New Contact</h2>
            <div className="form-control">
              <label className="label" htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="input input-bordered w-full max-w-xs"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              />
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleAddContact}>Save</button>
              <button className="btn" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
