import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FavoriteGenre} from "../genres/FavoriteGenre.jsx";

export function ArtistForm() {
    return (
        <Container  className="mt-4 mb-5">
            <h1>Add new artist</h1>

            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                        <Form.Control
                            placeholder="Enter artist name"
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