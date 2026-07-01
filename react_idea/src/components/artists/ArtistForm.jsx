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
import { getArtist, createArtist, updateArtist } from "../../api/artistApi";

export function ArtistForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { artistId } = useParams();
  const isEditMode = !!artistId;

  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    if (!isEditMode) return;

    getArtist(artistId)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => setError(err.message));
  }, [artistId, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (isEditMode) {
        await updateArtist(artistId, { name });
      } else {
        await createArtist({ name });
      }

      navigate(`/danh-sach-nghe-si?page=${page}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">{isEditMode ? "Edit artist" : "Add new artist"}</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Label>Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
        <Button type="button" variant="secondary" onClick={() => setName("")}>
          Reset
        </Button>{" "}
        <Button
          as={Link}
          to={`/danh-sach-nghe-si?page=${page}`}
          variant="outline-secondary"
        >
          Back to List
        </Button>
      </Form>
    </Container>
  );
}
