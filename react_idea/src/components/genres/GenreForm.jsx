import {Alert, Button, Container, Form, InputGroup, Spinner} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function GenreForm() {

    const { genreId } = useParams();
    const isEditMode = Boolean(genreId);
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode) {
            const fetchGenre = async () => {
                try {
                    const res = await fetch(`http://localhost:8080/api/v1/genres/${genreId}`);
                    if (!res.ok) throw new Error("Cannot to load genre information!");
                    const data = await res.json();
                    setName(data.name);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchGenre().catch(console.error);
        }
    }, [genreId, isEditMode]);

    const sleep = (ms) => new Promise((evo) => setTimeout(evo, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        console.log("Form data: ", {name, isSubmitting});

        try {
            await sleep(2000);
            const url = isEditMode
                ? `http://localhost:8080/api/v1/genres/${genreId}`
                : "http://localhost:8080/api/v1/genres";
            const method = isEditMode ? "PUT" : "POST";
            const res = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                })
            })
            if(!res.ok) {
                const payload = await res.json();
                const msg = payload?.message || "Save failed! Please check the server again.";
                throw new Error(msg);
            }

            navigate("/danh-sach-the-loai");

        } catch (error) {
            setError(error.message);
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5">
            <h1>{isEditMode ? "Edit Genre" : "Add New Genre"}</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Enter genre name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isInvalid={name.length > 0 && name.trim().length < 3}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Genre name must be at least 3 characters.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <div className="d-flex align-items-center">
                    <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        type="submit"
                        disabled={isSubmitting || name.trim().length < 3}
                    >
                        {isSubmitting ? <Spinner size="sm" animation="border" /> : (isEditMode ? "Update" : "Save")}
                    </Button>

                    {!isEditMode && (
                        <Button
                            variant="secondary"
                            size="sm"
                            type="reset"
                            className="me-2"
                            onClick={() => {
                                setName("");
                                setError(null);
                            }}
                        >
                            Reset
                        </Button>
                    )}

                    <Button
                        variant="outline-secondary"
                        size="sm"
                        as={Link} to="/danh-sach-the-loai"
                    >
                        Back to List
                    </Button>
                </div>
            </Form>
        </Container>
    );
}