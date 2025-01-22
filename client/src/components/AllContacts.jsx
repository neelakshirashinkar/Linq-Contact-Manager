import React, { useEffect, useState } from "react";
import axios from "axios";

function AllContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/contacts");
        setContacts(response.data);
      } catch (err) {
        setError("Failed to fetch contacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      setShowDetailsModal(false);
    } catch (err) {
      setError("Failed to delete contact. Please try again.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  if (error) {
    return <div className="alert alert-error shadow-lg m-4">{error}</div>;
  }

  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-3xl">All Contacts</h1>

      {contacts.length > 0 ? (
        <div className="space-y-4">
          {sortedContacts.map((contact) => (
            <div
              key={contact._id}
              className="card w-full sm:w-80 bg-base-100 shadow-xl cursor-pointer"
              onClick={() => {
                setSelectedContact(contact);
                setShowDetailsModal(true);
              }}
            >
              <div className="card-body">
                <h2 className="card-title">{contact.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info shadow-lg">No contacts found.</div>
      )}

      {showDetailsModal && selectedContact && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg">Contact Details</h2>
            <p>
              <strong>Name:</strong> {selectedContact.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={() => handleDeleteContact(selectedContact._id)}>
                Delete
              </button>
              <button className="btn" onClick={() => setShowDetailsModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllContacts;
