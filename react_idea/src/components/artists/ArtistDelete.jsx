import { Alert, Button, Container, Form, InputGroup, Spinner, Modal } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export function ArtistDelete() {
    const { artistId } = useParams();
    const navigate = useNavigate();

    const [artist, setArtist] = useState({ name: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const [showModal, setShowModal] = useState(false);

    // Gọi API lấy thông tin Artist để hiển thị lên Form (Read-only)
    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/v1/artists/${artistId}`);
                if (!res.ok) throw new Error(`Cannot load artist information (${res.status} Error)!`);
                const data = await res.json();
                setArtist(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArtist().catch(console.error);
    }, [artistId]);

    // Hàm xử lý gọi API Xóa (chỉ chạy khi người dùng bấm Yes trong Pop-up)
    const handleDelete = async () => {
        setShowModal(false); // Ẩn pop-up đi
        setIsDeleting(true);
        try {
            const res = await fetch(`http://localhost:8080/api/v1/artists/${artistId}`, {
                method: "DELETE",
            });

            if (res.ok || res.status === 204) {
                navigate("/danh-sach-nghe-si");
            } else {
                throw new Error("Delete failed! Please check the server again.");
            }
        } catch (err) {
            setError(err.message);
            setIsDeleting(false);
        }
    };

    return (
        <Container className="mt-4 mb-5">
            <h1>Delete Artist</h1>
            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Artist ID</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" value={artistId} readOnly disabled />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <InputGroup>
                                <Form.Control type="text" value={artist.name || ""} readOnly disabled />
                            </InputGroup>
                        </Form.Group>

                        <div className="d-flex align-items-center mt-4">
                            <Button
                                variant="danger"
                                size="sm"
                                className="me-2"
                                onClick={() => setShowModal(true)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? <Spinner size="sm" animation="border" /> : "Delete"}
                            </Button>

                            <Button
                                variant="outline-secondary"
                                size="sm"
                                as={Link} to="/danh-sach-nghe-si"
                            >
                                Back to List
                            </Button>
                        </div>
                    </Form>

                    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title className="text-danger">Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete the artist <strong>{artist.name}</strong> with ID <strong>{artist.id}</strong> ?
                            This action cannot be undone.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDelete}>
                                Yes, Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            )}
        </Container>
    );
}