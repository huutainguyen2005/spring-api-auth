import {Alert, Button, Container, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

function GenreTableRow({ genre }) {
    return (
        <tr>
            <td>{genre.genreId}</td>
            <td>{genre.name}</td>
            <td>
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    as={Link} to={`/chinh-sua-the-loai/${genre.id}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/xoa-the-loai/${genre.id}`}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

function GenreTable({genreList}) {

    return (
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                genreList.length > 0 ?
                    genreList.map(genre => <GenreTableRow key={genre.genreId} genre={genre} />) :
                    <tr><td style={{ textAlign: 'center' }} colSpan={2}>There are no genres found.</td></tr>
            }
            </tbody>
        </Table>
    );
}

export function GenreList() {

    //state genres
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Call API -> get genre list
    // Inline arrow fn

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/genres")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Lỗi mạng hoặc server không phản hồi (${res.status})!`);
                }
                return res.json();
            })
            .then(data => {
                setGenres(data.content);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <Container className="flex-grow-1 mt-4 mb-5">
            <h1>Genre List</h1>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" as={Link} to="/them-moi-the-loai">Add</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <GenreTable genreList={genres} />
            )}

        </Container>

    );
}