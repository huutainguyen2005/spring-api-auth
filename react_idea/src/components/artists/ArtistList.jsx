import {Alert, Button, Container, Pagination, Spinner, Table} from "react-bootstrap";
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
        <Table striped bordered hover>
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

    // State artists
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Call API -> get artist list
    // Inline arrow fn

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/api/v1/artists?page=${currentPage}&size=10`);
                if (!res.ok) {
                    throw new Error(`Lỗi mạng hoặc server không phản hồi (${res.status})!`);
                }
                const data = await res.json();
                setArtists(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
            loadData().catch(console.error);
    }, [currentPage]); // Chạy 1 lần duy nhất khi component được mount

    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => setCurrentPage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container className="mt-4 mb-5">
            {/*<div className="d-flex justify-content-between align-items-center mb-3">*/}
            {/*    <h1>Artists list</h1>*/}
            {/*    <Button variant="success" as={Link} to="/them-moi-nghe-si">Add</Button>*/}
            {/*</div>*/}

            <h1>Artist List</h1>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" as={Link} to="/them-moi-nghe-si">Add</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <>
                    <ArtistTable artistList={artists} />

                    {totalPages > 1 && (
                        <Pagination className="justify-content-center mt-4">
                            <Pagination.First
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                            />
                            <Pagination.Prev
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {paginationItems}
                            <Pagination.Next
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                            <Pagination.Last
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    )}
                </>
            )}
        </Container>
    );
}