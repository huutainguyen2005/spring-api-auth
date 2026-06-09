import {Alert, Button, Container, Form, InputGroup, Spinner} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

export function GenreForm() {

    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const sleep = (ms) => new Promise((evo) => setTimeout(evo, ms));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        console.log("Form data: ", {name, isSubmitting});
        await sleep(2000);


        try {
            const res = await fetch("http://localhost:8080/api/v1/genres", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                })
            })
            if(res.status === 201){
                navigate("/danh-sach-the-loai");
            }
        } catch (error) {
            setError(error.message);
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="mt-4 mb-5">
            <h1>Add new genre</h1>
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
        </Container>
    );
}