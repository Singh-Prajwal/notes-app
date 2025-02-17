import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { Note } from "../types/Note";

interface NoteListProps {
  notes: Note[];
  deleteNote: (id: string) => void;
  editNote: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, deleteNote, editNote }) => {
  return (
    <Container>
      <Row>
        {notes.map((note) => (
          <Col md={4} key={note.id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <small className="text-muted">Category: {note.category}</small>
                <br />
                <small className="text-muted">
                  Updated: {new Date(note.updatedAt).toLocaleString()}
                </small>
                <div className="mt-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => editNote(note)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NoteList;
