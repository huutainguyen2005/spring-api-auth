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
import { deleteAlbum, getAlbumList, getAlbum } from "../../api/albumApi";

function AlbumDeletePage({ children }) {
  return (
    <Container>
      <h1>Delete album</h1>
      {children}
    </Container>
  );
}

export function AlbumDelete() {
  const [album, setAlbum] = useState({});
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { albumId } = useParams();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    getAlbum(albumId)
      .then((res) => {
        setAlbum(res.data);
        setNotFound(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setNotFound(true);
        }
        setError(err.message);
      });
  }, [albumId]);

  const confirmDelete = async () => {
    setDeleting(true);

    try {
      await deleteAlbum(albumId);

      const resp = await getAlbumList(page, 10);

      const newPage = Math.max(
        1,
        Math.min(Number(page), resp.data.totalPages || 1),
      );

      setShowModal(false);
      navigate(`/danh-sach-album?page=${newPage}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleting(false);
      setShowModal(false);
    }
  };

  if (notFound) {
    return (
      <AlbumDeletePage>
        <Alert variant="danger">Album with ID {albumId} not found.</Alert>

        <Button
          variant="outline-secondary"
          onClick={() => navigate(`/danh-sach-album?page=${page}`)}
        >
          Back to List
        </Button>
      </AlbumDeletePage>
    );
  }

  return (
    <AlbumDeletePage>
      <Form>
        <Form.Label>Album ID</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={album.albumId ?? ""} readOnly />
        </InputGroup>

        <Form.Label>Album Title</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={album.title ?? ""} readOnly />
        </InputGroup>

        <Form.Label>Artist</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={album.artist?.name ?? ""} readOnly />
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
          onClick={() => navigate(`/danh-sach-album?page=${page}`)}
        >
          Back to List
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Album</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete album <strong>{album.title}</strong>{" "}
          with ID <strong>{album.albumId}</strong>?
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={deleting}
          >
            Cancel
          </Button>

          <Button variant="danger" onClick={confirmDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Confirm Delete"}
          </Button>
        </Modal.Footer>
      </Modal>
    </AlbumDeletePage>
  );
}
