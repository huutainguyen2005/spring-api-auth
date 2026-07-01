import {
  Alert,
  Button,
  Container,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGenre, deleteGenre, getGenreList } from "../../api/genreApi";

function GenreDeletePage({ children }) {
  return (
    <Container>
      <h1>Delete genre</h1>
      {children}
    </Container>
  );
}

export function GenreDelete() {
  const [genre, setGenre] = useState({});
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { genreId } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteGenre(genreId);

      const resp = await getGenreList(page, 10);

      const newPage = Math.max(
        1,
        Math.min(Number(page), resp.data.totalPages || 1),
      );

      setShowModal(false);
      navigate(`/danh-sach-the-loai?page=${newPage}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  useEffect(() => {
    getGenre(genreId)
      .then((res) => {
        setGenre(res.data);
        setNotFound(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true);
        setError(err.message);
      });
  }, [genreId]);

  if (notFound) {
    return (
      <GenreDeletePage>
        <Alert variant="danger">Genre with ID {genreId} not found.</Alert>
        <Button onClick={() => navigate(`/danh-sach-the-loai?page=${page}`)}>
          Back to list
        </Button>
      </GenreDeletePage>
    );
  }

  return (
    <GenreDeletePage>
      <Form>
        <Form.Label>ID</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={genre.genreId ?? ""} readOnly />
        </InputGroup>

        <Form.Label>Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={genre.name ?? ""} readOnly />
        </InputGroup>

        <Form.Label>Description</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={genre.description ?? ""} readOnly />
        </InputGroup>

        <Form.Label>Popularity Score</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={genre.popularityScore ?? ""} readOnly />
        </InputGroup>

        <Form.Label>Is Active</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={genre.isActive ? "Yes" : "No"} readOnly />
        </InputGroup>

        {!!error && <Alert variant="danger">{error}</Alert>}

        <Button
          variant="danger"
          className="me-2"
          onClick={() => setShowModal(true)}
        >
          Delete
        </Button>

        <Button
          variant="outline-secondary"
          onClick={() => navigate(`/danh-sach-the-loai?page=${page}`)}
        >
          Back to list
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Genre</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete genre <strong>{genre.name}</strong>{" "}
          with ID <strong>{genre.genreId}</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Confirm Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </GenreDeletePage>
  );
}
