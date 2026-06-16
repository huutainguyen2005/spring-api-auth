import {Alert, Button, Container, Form, Pagination, Spinner, Table} from "react-bootstrap";
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
                    as={Link} to={`/chinh-sua-album/${album.albumId}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/xoa-album/${album.albumId}`}
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

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    //state albums
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [jumpPage, setJumpPage] = useState("");

    // Call API -> get album list
    // Inline arrow fn

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/albums?page=${currentPage}&size=${size}`);
                if (!res.ok) {
                    throw new Error(`Network error or server not responding (${res.status})!`);
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
    }, [API_BASE_URL, currentPage, size]);

    const handleInputChange = (e) => {
        const val = e.target.value;

        if (val === "") {
            setJumpPage("");
            return;
        }

        const parsed = parseInt(val, 10);
        if (!isNaN(parsed)) {
            if (parsed < 1) {
                setJumpPage(1);
            } else if (parsed > totalPages) {
                setJumpPage(totalPages);
            } else {
                setJumpPage(parsed);
            }
        }
    };

    const handleJumpPage = (e) => {
        if (e.key === 'Enter') {
            if (jumpPage !== "") {
                setCurrentPage(Number(jumpPage));
            }
        }
    };

    let paginationItems = [];

    if (totalPages <= 10) {
        for (let number = 1; number <= totalPages; number++) {
            paginationItems.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                    {number}
                </Pagination.Item>
            );
        }
    } else {
        // Đang ở những trang đầu (VD: < 1 2 3 4 5 6 7 ... 28 >)
        if (currentPage <= 5) {
            for (let number = 1; number <= 7; number++) {
                paginationItems.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
            paginationItems.push(<Pagination.Item key={totalPages} onClick={() => setCurrentPage(totalPages)}>{totalPages}</Pagination.Item>);
        }
        // Đang ở những trang cuối (VD: < 1 ... 22 23 24 25 26 27 28 >)
        else if (currentPage >= totalPages - 4) {
            paginationItems.push(<Pagination.Item key={1} onClick={() => setCurrentPage(1)}>1</Pagination.Item>);
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
            for (let number = totalPages - 6; number <= totalPages; number++) {
                paginationItems.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
        }
        else {
            paginationItems.push(<Pagination.Item key={1} onClick={() => setCurrentPage(1)}>1</Pagination.Item>);
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
            for (let number = currentPage - 2; number <= currentPage + 2; number++) {
                paginationItems.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
            paginationItems.push(<Pagination.Item key={totalPages} onClick={() => setCurrentPage(totalPages)}>{totalPages}</Pagination.Item>);
        }
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
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <Pagination className="mb-0 me-4">
                                <Pagination.Prev
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                />

                                {paginationItems}

                                <Pagination.Next
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                />
                            </Pagination>

                            <div className="d-flex align-items-center">
                                <span className="me-2 text-muted text-nowrap">Go to page:</span>
                                <Form.Control
                                    type="number"
                                    size="sm"
                                    style={{ width: '70px', textAlign: 'center' }}
                                    value={jumpPage}
                                    onChange={handleInputChange}
                                    onKeyDown={handleJumpPage}
                                    placeholder=""
                                    min={1}
                                    max={totalPages}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}

        </Container>

    );
}