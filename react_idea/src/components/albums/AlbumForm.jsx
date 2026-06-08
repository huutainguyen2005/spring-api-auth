import {Alert, Button, Container, Form, InputGroup, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export function AlbumForm() {

    const [title, setTitle] = useState("");
    const [artistId, setArtistId] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        // // Lấy token từ Postman và dán tạm vào biến này để test.
        // const fakeAdminToken = "DAN_TOKEN_VAO_DAY";

        // Dùng Fetch gửi phương thức POST xuống Backend
        try {
        const res = await fetch("http://localhost:8080/api/v1/albums", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${fakeAdminToken}` // Gửi token qua cổng Security
            },
            body: JSON.stringify({
                title: title,
                artistId: parseInt(artistId)
            })
        })
            if(res.status === 201){
                navigate("/danh-sach-album");
            }
        } catch (error) {
            setError(error.message);
            setIsSubmitting(false);
        }
    };


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
                            required
                        />
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
                            required
                        />
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