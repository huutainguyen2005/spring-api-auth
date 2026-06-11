import {Alert, Button, Col, Container, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate, useParams} from "react-router-dom";
import {FavoriteGenre} from "../genres/FavoriteGenre.jsx";
import {useEffect, useState} from "react";

export function ArtistForm() {

    // API để create artist -> Check lại bên BE

    // useEffect(fn, deps);

    // fetch() ->

    // Handle form submit 2 approachs
    // 1. Bắt sự kiện click của button
    // 2. Bắt sự kiện form on submit

    // Prevent default behavior

    const { artistId } = useParams();
    const isEditMode = Boolean(artistId);
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (isEditMode) {
            const fetchArtist = async () => {
                try {
                    const res = await fetch(`http://localhost:8080/api/v1/artists/${artistId}`);
                    if (!res.ok) throw new Error("Cannot to load artist information!");
                    const data = await res.json();
                    setName(data.name);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchArtist().catch(console.error);
        }
    }, [artistId, isEditMode]);

    const sleep = (ms) => new Promise((evo) => setTimeout(evo, ms));

    const handleSubmit = async (e) => {
        // Ngăn trình duyệt tự động reload trang (behavior mặc định của thẻ Form)
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        console.log("Form data: ", {name, isSubmitting});

        // // Lấy token từ Postman và dán tạm vào biến này để test.
        // const fakeAdminToken = "DAN_TOKEN_VAO_DAY";

        // Dùng Fetch gửi phương thức POST xuống Backend
        try {
            await sleep(2000);

            const url = isEditMode
                ? `http://localhost:8080/api/v1/artists/${artistId}`
                : "http://localhost:8080/api/v1/artists";
            const method = isEditMode ? "PUT" : "POST";
        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${fakeAdminToken}` // Gửi token qua cổng Security
            },
            body: JSON.stringify({ name: name }) // Chuyển state thành JSON
        });
            if(!res.ok) {
                const payload = await res.json();
                // Toan tu || (A || B) trong phep assign co nghia A null -> B, A != null -> A
                const msg = payload?.message || "Save failed! Please check the server again.";
                throw new Error(msg);
            }

            navigate('/danh-sach-nghe-si');

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
            <h1>{isEditMode ? "Edit Artist" : "Add New Artist"}</h1>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Enter artist name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            isInvalid={name.length > 0 && name.trim().length < 3}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Artist name must be at least 3 characters.
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
                        as={Link} to="/danh-sach-nghe-si"
                    >
                        Back to List
                    </Button>
                </div>
            </Form>

            <Row className={'mt-3'}>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
            </Row>
        </Container>
    );
}