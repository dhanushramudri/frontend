import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
  const URL = "https://backend-zeta-six-62.vercel.app/";
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const apiUrl = `${URL}api/tasks`;

  const getToken = () => {
    return localStorage.getItem("accesstoken");
  };

  const setAuthHeader = () => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      setIsLoggedIn(true);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    setAuthHeader();
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(apiUrl);
      setNotes(response.data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Update product
        await axios.put(`${apiUrl}/${note._id}`, note); // Use note._id for correct update
      } else {
        // Create product
        await axios.post(apiUrl, note);
      }
      setNote({ title: "", description: "" }); // Reset note state after submit
      setEditing(false);
      fetchNotes(); // Refresh the notes list
    } catch (err) {
      console.error("Error saving product:", err);
      setError("Failed to save product");
    }
  };

  const handleEdit = (note) => {
    setNote(note);
    setEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchNotes(); // Refresh notes list after deletion
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product");
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h3>
          <img className="logoimg" src="billbologo.jpg" alt="Logo" />
        </h3>
        {isLoggedIn ? (
          <button className="btn">
            <Link to="/login">Login</Link>{" "}
            {/* Update to 'Logout' when logged in */}
          </button>
        ) : (
          <button className="btn">
            <Link to="/register">Register</Link>
          </button>
        )}
      </div>
      <div className="note">
        <h1>Sticky Wall</h1>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form className="adminproductform" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={note.title}
            placeholder="Title"
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            value={note.description}
            placeholder="Description"
            onChange={handleInputChange}
            required
          />
          <button type="submit">
            {editing ? "Update Product" : "Create Product"}
          </button>
        </form>
        <ul className="adminproductcard">
          {notes.map((note) => (
            <li className="cardadmin" key={note._id}>
              <h3 className="adminname">{note.title}</h3>
              <p className="admincontent">{note.description}</p>
              <div className="button-group">
                <button className="admiedit" onClick={() => handleEdit(note)}>
                  Edit
                </button>
                <button
                  className="admidelete"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
