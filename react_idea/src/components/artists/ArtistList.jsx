import {Button, Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {artistList} from "../../data/chinook.js";

function ArtistTableRow({ artist }) {
    return (
        <tr>
            <td>{artist.id}</td>
            <td>{artist.name}</td>
            <td>
                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    as={Link} to={`/artists/edit/${artist.id}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/artists/delete/${artist.id}`}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

export function ArtistTable() {
    return (
        <Container className="flex-grow-1 mt-4 mb-5">
            <h1 className="text-start">Artists list</h1>

            {/* Add Button */}
            <div className="d-flex justify-content-end">
                <Button variant="success" as={Link} to="/artists/add">Add</Button>
            </div>

            {/* Table */}
            <Table hover responsive className="text-start">
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
                    artistList.map(artist => <ArtistTableRow key={artist.id} artist={artist} />) :
                        <tr><td style={{ textAlign: 'center' }} colSpan={3}>There are no artist found.</td></tr>
                }
                </tbody>
            </Table>
        </Container>
    );
}