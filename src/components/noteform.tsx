import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "../types/Note";

interface NoteFormProps {
  show: boolean;
  handleClose: () => void;
  saveNote: (note: Note) => void;
  editNote?: Note;
}

const NoteForm: React.FC<NoteFormProps> = ({
  show,
  handleClose,
  saveNote,
  editNote,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setContent(editNote.content || "");
      setCategory(editNote.category);
    } else {
      setTitle("");
      setContent("");
      setCategory("");
    }
  }, [editNote]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const newNote: Note = {
      id: editNote ? editNote.id : new Date().toISOString(),
      title,
      content,
      category,
      createdAt: editNote ? editNote.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveNote(newNote);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editNote ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {editNote ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NoteForm;
