import {
  Container,
  InputGroup,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { getAlbum, createAlbum, updateAlbum } from "../../api/albumApi";
import { getArtist } from "../../api/artistApi";

export function AlbumForm() {
  const [title, setTitle] = useState("");
  const [artistId, setArtistId] = useState("");
  const [artistName, setArtistName] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { albumId } = useParams();
  const isEditMode = !!albumId;

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    if (!isEditMode) return;

    getAlbum(albumId)
      .then((res) => {
        const data = res.data;
        setTitle(data.title);
        setArtistId(data.artist?.artistId ?? "");
        setArtistName(data.artist?.name ?? "");
      })
      .catch((err) => setError(err.message));
  }, [albumId, isEditMode]);

  const fetchArtist = async (id) => {
    if (!id) {
      setArtistName("");
      return;
    }

    try {
      const res = await getArtist(id);
      setArtistName(res.data.name);
    } catch {
      setArtistName("Artist not found");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await updateAlbum(albumId, { title, artistId });
      } else {
        await createAlbum({ title, artistId });
      }

      navigate(`/danh-sach-album?page=${page}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">{isEditMode ? "Edit album" : "Add new album"}</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Label>Title</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </InputGroup>
        <Form.Label>Artist ID</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={artistId}
            onChange={(e) => setArtistId(e.target.value)}
            onBlur={() => fetchArtist(artistId)}
            required
          />
        </InputGroup>
        <Form.Label>Artist Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control value={artistName} readOnly />
        </InputGroup>
        {!!error && (
          <Row>
            <Col xs={12}>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}
        <Button type="submit" variant="success" disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </Button>{" "}
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setTitle("");
            setArtistId("");
            setArtistName("");
          }}
        >
          Reset
        </Button>{" "}
        <Button
          as={Link}
          to={`/danh-sach-album?page=${page}`}
          variant="outline-secondary"
        >
          Back to List
        </Button>
      </Form>
    </Container>
  );
}
