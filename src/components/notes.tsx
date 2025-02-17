import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import NoteForm from "./noteform";
import NoteList from "./notelist";
import { Note } from "../types/Note";

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);

  const handleSaveNote = (note: Note) => {
    if (editNote) {
      setNotes(notes.map((n) => (n.id === note.id ? note : n)));
      setEditNote(null);
    } else {
      setNotes([...notes, note]);
    }
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEditNote = (note: Note) => {
    setEditNote(note);
    setShowForm(true);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Notes App</h2>
      <Button
        variant="primary"
        onClick={() => setShowForm(true)}
        className="mb-3"
      >
        Add Note
      </Button>
      <NoteList
        notes={notes}
        deleteNote={handleDeleteNote}
        editNote={handleEditNote}
      />
      <NoteForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        saveNote={handleSaveNote}
        editNote={editNote || undefined}
      />
    </Container>
  );
};

export default Notes;
