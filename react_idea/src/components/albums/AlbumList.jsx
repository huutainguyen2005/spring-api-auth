import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {albumList, artistList} from "../../data/chinook.js";

function AlbumTableRow({ album }) {

    const foundArtist = artistList.find(a => a.id === album.artistId);

    return (
        <tr>
            <td>{album.id}</td>
            <td>{album.title}</td>
            <td>{foundArtist ? foundArtist.name : 'Unknown'}</td>
            <td>
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    as={Link} to={`/albums/edit/${album.id}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/albums/delete/${album.id}`}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export function AlbumTable() {

    return (
        <Container className="flex-grow-1 mt-4 mb-5">
            <h1 className="text-start">Albums list</h1>

            {/* Add Button */}
            <div className="d-flex justify-content-end">
                <Button variant="success" as={Link} to="/artists/add">Add</Button>
            </div>

            {/* Table */}
            <Table hover responsive className="text-start">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Artist Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    albumList.length > 0 ?
                        albumList.map(album => <AlbumTableRow key={album.id} album={album} />) :
                        <tr><td style={{ textAlign: 'center' }} colSpan={4}>There are no albums found.</td></tr>
                }
                </tbody>
            </Table>
        </Container>
    );
}