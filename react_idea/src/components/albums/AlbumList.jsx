import {Alert, Button, Container, Pagination, Spinner, Table} from "react-bootstrap";
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
            <Table striped bordered hover>
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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    // Call API -> get album list
    // Inline arrow fn

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/api/v1/albums?page=${currentPage}&size=10`);
                if (!res.ok) {
                    throw new Error(`Lỗi mạng hoặc server không phản hồi (${res.status})!`);
                }
                const data = await res.json();
                setAlbums(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
            loadData().catch(console.error);
    }, [currentPage]);

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
        <Container className="flex-grow-1 mt-4 mb-5">
            <h1>Album List</h1>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" as={Link} to="/them-moi-album">Add</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <>
                    <AlbumTable albumList={albums} />

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