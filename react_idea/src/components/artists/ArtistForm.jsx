import {Alert, Button, Col, Container, Form, InputGroup, Row, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {FavoriteGenre} from "../genres/FavoriteGenre.jsx";
import {useState} from "react";

export function ArtistForm() {

    // API để create artist -> Check lại bên BE

    // useEffect(fn, deps);

    // fetch() ->

    // Handle form submit 2 approachs
    // 1. Bắt sự kiện click của button
    // 2. Bắt sự kiện form on submit

    // Prevent default behavior

    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const sleep = (ms) => new Promise((evo) => setTimeout(evo, ms));

    const handleSubmit = async (e) => {
        // Ngăn trình duyệt tự động reload trang (behavior mặc định của thẻ Form)
        e.preventDefault();
        console.log("Form data: ", {name, isSubmitting});
        await sleep(2000);
        setIsSubmitting(true);
        setError(null);

        // // Lấy token từ Postman và dán tạm vào biến này để test.
        // const fakeAdminToken = "DAN_TOKEN_VAO_DAY";

        // Dùng Fetch gửi phương thức POST xuống Backend
        try {
        const res = await fetch("http://localhost:8080/api/v1/artists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${fakeAdminToken}` // Gửi token qua cổng Security
            },
            body: JSON.stringify({ name: name }) // Chuyển state thành JSON
        });
            if(res.status === 201) {
                navigate("/danh-sach-nghe-si");
            }
        } catch (error) {
            setError(error.message);
            setIsSubmitting(false);
        }
    };

    return (
        <Container  className="mt-4 mb-5">
            <h1>Add new artist</h1>
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
                        disabled={isSubmitting || name.trim().length < 3}
                    >
                        {isSubmitting ? <Spinner size="sm" animation="border" /> :   "Save"}
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