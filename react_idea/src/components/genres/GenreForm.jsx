import {Button, Container, Form, InputGroup} from "react-bootstrap";
import { Link } from "react-router-dom";

export function GenreForm() {
    return (
        <Container className="mt-4 mb-5">
            <h1>Add new genre</h1>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                        <Form.Control
                            placeholder="Enter genre name"
                        />
                    </InputGroup>
                </Form.Group>

                <div className="d-flex align-items-center">
                    <Button
                        variant="success"
                        size="sm"
                        className="me-2"
                        type="button"
                    >
                        Save
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
                        as={Link} to="/danh-sach-the-loai"
                    >
                        Back to List
                    </Button>
                </div>
            </Form>
        </Container>
    );
}