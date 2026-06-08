import {Alert, Button, Container, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

function ArtistTableRow({ artist }) {
    return (
        <tr>
            <td>{artist.artistId}</td>
            <td>{artist.name}</td>
            <td>
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    as={Link} to={`/chinh-sua-nghe-si/${artist.id}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/xoa-nghe-si/${artist.id}`}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

// Props -> Data được truyền từ parent vào Component
function ArtistTable({artistList}) {
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
                    artistList.length > 0 ?
                        artistList.map(artist => <ArtistTableRow key={artist.artistId} artist={artist} />) :
                        <tr><td style={{ textAlign: 'center' }} colSpan={3}>There are no artist found.</td></tr>
                }
                </tbody>
            </Table>
    );
}

export function ArtistList() {

    //state artists
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Call API -> get artist list
    // Inline arrow fn

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/artists")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Lỗi mạng hoặc server không phản hồi (${res.status})!`);
                }
                return res.json();
            })
            .then(data => {
                setArtists(data.content);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []); // Chạy 1 lần duy nhất khi component được mount


    return (
        <Container className="flex-grow-1 mt-4 mb-5">
            <h1>Artists list</h1>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" as={Link} to="/them-moi-nghe-si">Add</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <ArtistTable artistList={artists} />
            )}
        </Container>

    );
}