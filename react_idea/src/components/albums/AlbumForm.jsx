import {Alert, Button, Container, Form, InputGroup, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export function AlbumForm() {

    const [title, setTitle] = useState("");
    const [artistId, setArtistId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const sleep = (ms) => new Promise((evo) => setTimeout(evo, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        console.log("Form data: ", {title, isSubmitting});
        await sleep(2000);


        try {
        const res = await fetch("http://localhost:8080/api/v1/albums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                artistId: parseInt(artistId)
            })
        })
            if(res.status === 201){
                navigate("/danh-sach-album");
            } else if (!res.ok) {
                throw new Error("Artist ID does not exist!");
            }
        } catch (error) {
            setError(error.message);
            setIsSubmitting(false);
        }
    };

    const isIdInvalid = artistId !== "" && parseInt(artistId) <= 0;

    return (
        <Container  className="mt-4 mb-5">
            <h1>Add new album</h1>
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
                        {isSubmitting ? <Spinner size="sm" animation="border" /> : "Save"}
                    </Button>

                    <Button
                        variant="secondary"
                        size="sm"
                        type="reset"
                    >
                        Reset
                    </Button>

                    <Button
                        variant="outline-secondary"
                        size="sm"
                        className="ms-2"
                        as={Link} to="/danh-sach-album"
                    >
                        Back to List
                    </Button>
                </div>
            </Form>
        </Container>
    );
}