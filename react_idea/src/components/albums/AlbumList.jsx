import {Alert, Button, Container, Spinner, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

function AlbumTableRow({ album }) {
    return (
        <tr>
            <td>{album.albumId}</td>
            {/*<td>{album.artist.name}</td>*/}
            <td>{album.title}</td>
            <td>
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    as={Link} to={`/chinh-sua-album/${album.id}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/xoa-album/${album.id}`}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

function AlbumTable({albumList}) {

    return (
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    {/*<th>Artist Name</th>*/}
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    albumList.length > 0 ?
                        albumList.map(album => <AlbumTableRow key={album.albumId} album={album} />) :
                        <tr><td style={{ textAlign: 'center' }} colSpan={3}>There are no albums found.</td></tr>
                }
                </tbody>
            </Table>
    );
}

export function AlbumList() {

    //state albums
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Call API -> get album list
    // Inline arrow fn

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/albums")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Lỗi mạng hoặc server không phản hồi (${res.status})!`);
                }
                return res.json();
            })
            .then(data => {
                setAlbums(data.content);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <Container className="flex-grow-1 mt-4 mb-5">
            <h1>Album List</h1>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" as={Link} to="/them-moi-album">Add</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
                <div className="text-center mt-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : (
                <AlbumTable albumList={albums} />
            )}

        </Container>

    );
}