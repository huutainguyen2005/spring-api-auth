import React from "react";
import {Button, Container, Table} from "react-bootstrap";

const fakeArtists = [
    { id: 1, name: 'AC/DC' },
    { id: 2, name: 'Accept' },
    { id: 3, name: 'Aerosmith' },
    { id: 4, name: 'Alanis Morissette' },
    { id: 5, name: 'Alice In Chains' },
    { id: 6, name: 'Antônio Carlos Jobim' },
    { id: 7, name: 'Apocalyptica' },
    { id: 8, name: 'Audioslave' },
    { id: 9, name: 'BackBeat' },
    { id: 10, name: 'Billy Cobham' },
];

function ArtistTable() {
    return (
        <Container className="flex-grow-1 mt-4">
            <h1 className="mb-4 text-start">Artists list</h1>

            {/* Add Button */}
            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" href="/artists/add">Add</Button>
            </div>

            {/* Table */}
            <Table hover responsive className="text-start">
                <thead>
                <tr>
                    <th style={{ width: '10%' }}>ID</th>
                    <th style={{ width: '60%' }}>Name</th>
                    <th style={{ width: '30%' }}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {fakeArtists.map((artist) => (
                    <tr key={artist.id}>
                        <td>{artist.id}</td>
                        <td>{artist.name}</td>
                        <td>
                            <Button
                                variant="primary"
                                size="sm"
                                className="me-2"
                                href={`/artists/edit/${artist.id}`}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                size="sm"
                                href={`/artists/delete/${artist.id}`}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ArtistTable;