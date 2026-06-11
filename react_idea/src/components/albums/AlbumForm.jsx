import {Alert, Button, Container, Form, InputGroup, Spinner} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function AlbumForm() {

    const { albumId } = useParams();
    const isEditMode = Boolean(albumId);
    const [title, setTitle] = useState("");
    const [artistId, setArtistId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode) {
            const fetchAlbum = async () => {
                try {
                    const res = await fetch(`http://localhost:8080/api/v1/albums/${albumId}`);
                    if (!res.ok) throw new Error("Cannot to load album information!");
                    const data = await res.json();
                    setTitle(data.title);
                    setArtistId(data.artist?.artistId || data.artistId || "");
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAlbum().catch(console.error);
        }
    }, [albumId, isEditMode]);
    
    const sleep = (ms) => new Promise((evo) => setTimeout(evo, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        console.log("Form data: ", {title, isSubmitting});
        await sleep(2000);


        try {
            const url = isEditMode
            ? `http://localhost:8080/api/v1/albums/${albumId}`
            : `http://localhost:8080/api/v1/albums`
            const method = isEditMode ? "PUT" : "POST";
            const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                artistId: parseInt(artistId)
            })
        })

            if(!res.ok) {
                const payload = await res.json();
                const msg = payload?.message || "Save failed! Please check the server again.";
                throw new Error(msg);
            }

            navigate("/danh-sach-album");

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

    const isIdInvalid = artistId !== "" && parseInt(artistId) <= 0;

    return (
        <Container  className="mt-4 mb-5">
            <h1>{isEditMode ? "Edit Album" : "Add New Album"}</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Artist ID</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="number"
                            placeholder="Enter artist ID"
                            value={artistId}
                            onChange={(e) => setArtistId(e.target.value)}
                            isInvalid={isIdInvalid}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Artist ID must be greater than 0.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Enter album title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            isInvalid={title.length > 0 && title.trim().length < 5}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Album title must be at least 5 characters.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <div className="d-flex align-items-center">
                    <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        type="submit"
                        disabled={isSubmitting || title.trim() === ""}
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
                                setTitle("");
                                setArtistId("");
                                setError(null);
                            }}
                        >
                            Reset
                        </Button>
                    )}

                    <Button
                        variant="outline-secondary"
                        size="sm"
                        as={Link} to="/danh-sach-album"
                    >
                        Back to List
                    </Button>
                </div>
            </Form>
        </Container>
    );
}