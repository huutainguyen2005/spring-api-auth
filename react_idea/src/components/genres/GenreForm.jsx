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

import { getGenre, createGenre, updateGenre } from "../../api/genreApi";

export function GenreForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [popularityScore, setPopularityScore] = useState("");

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { genreId } = useParams();
  const isEditMode = !!genreId;
  const [isActive, setIsActive] = useState("");
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  useEffect(() => {
    if (!isEditMode) return;

    getGenre(genreId)
      .then((res) => {
        const g = res.data;
        setName(g.name);
        setDescription(g.description || "");
        setPopularityScore(g.popularityScore || "");
        setIsActive(g.isActive || false);
      })
      .catch((err) => setError(err.message));
  }, [genreId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      name,
      description,
      popularityScore: Number(popularityScore),
      isActive,
    };

    try {
      if (isEditMode) {
        await updateGenre(genreId, payload);
      } else {
        await createGenre(payload);
      }

      navigate(`/danh-sach-the-loai?page=${page}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h1 className="mt-4">{isEditMode ? "Edit genre" : "Add genre"}</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Label>Name</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </InputGroup>

        <Form.Label>Description</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>

        <Form.Label>Popularity Score</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="number"
            value={popularityScore}
            onChange={(e) => setPopularityScore(e.target.value)}
          />
        </InputGroup>

        <Form.Label>Is Active</Form.Label>
        <InputGroup className="mb-3">
          <Form.Select
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
            required
          >
            <option value="">-- Select status --</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Form.Select>
        </InputGroup>

        {!!error && <Alert variant="danger">{error}</Alert>}

        <Button
          variant={"success"}
          className={"me-2"}
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Saving..." : "Save"}
        </Button>

        <Button
          type="button"
          variant={"secondary"}
          className={"me-2"}
          onClick={() => window.location.reload()}
        >
          Reset
        </Button>

        <Button
          as={Link}
          to={`/danh-sach-the-loai?page=${page}`}
          variant={"outline-secondary"}
        >
          Back to List
        </Button>
      </Form>
    </Container>
  );
}
