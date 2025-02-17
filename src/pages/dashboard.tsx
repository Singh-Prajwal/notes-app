import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "",
    userId: localStorage.getItem("userId"),
  });
  const darkMode = localStorage.getItem("darkMode");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/notes",
          { userId: localStorage.getItem("userId") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes", error);
      }
    };
    fetchNotes();
  }, []);
  console.log("newNote", newNote);
  const handleCreateNote = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/notes",
        newNote,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes([...notes, data]);
      setNewNote({
        title: "",
        content: "",
        category: "",
        userId: localStorage.getItem("userId"),
      });
    } catch (error) {
      console.error("Error creating note", error);
    }
  };

  return (
    <div
      className={`container-fluid min-vh-100 p-4 ${darkMode ? "text-light" : "text-dark"}`}
    >
      <div className="container">
        <h2 className="text-center mb-4 text-primary">📌 Notes Dashboard</h2>

        {/* Note Form */}
        <div className="card p-4 shadow-sm bg-white mb-4">
          <h4 className="mb-3 text-center text-secondary">Create a New Note</h4>
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) =>
                setNewNote({ ...newNote, title: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control rounded-pill shadow-sm"
              placeholder="Category"
              value={newNote.category}
              onChange={(e) =>
                setNewNote({ ...newNote, category: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control shadow-sm"
              rows={3}
              placeholder="Write your note..."
              value={newNote.content}
              onChange={(e) =>
                setNewNote({ ...newNote, content: e.target.value })
              }
            />
          </div>
          <button
            className="btn btn-primary w-100 rounded-pill shadow"
            onClick={handleCreateNote}
          >
            ✏️ Add Note
          </button>
        </div>

        {/* Notes List */}
        <h3 className="text-secondary mb-3">📜 Your Notes</h3>
        <div className="row">
          {notes.length === 0 ? (
            <p className="text-muted text-center">
              No notes found. Start adding some!
            </p>
          ) : (
            notes.map((note: any) => (
              <div key={note._id} className="col-md-4 mb-4">
                <div className="card shadow-sm border-0 bg-white h-100">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{note.title}</h5>
                    <p className="card-text text-muted">{note.content}</p>
                    <span className="badge bg-secondary">{note.category}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
