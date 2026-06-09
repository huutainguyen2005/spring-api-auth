import {Alert, Button, Container, Form, Pagination, Spinner, Table} from "react-bootstrap";
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
                    as={Link} to={`/chinh-sua-the-loai/${genre.genreId}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/xoa-the-loai/${genre.genreId}`}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

function GenreTable({genreList}) {
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

    // State phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [jumpPage, setJumpPage] = useState("");

    // Call API -> get genre list
    // Inline arrow fn

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`http://localhost:8080/api/v1/genres?page=${currentPage}&size=10`);
                if (!res.ok) {
                    throw new Error(`Network error or server not responding (${res.status})!`);
                }
                const data = await res.json();
                setGenres(data.content);
                setTotalPages(data.totalPages);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
            loadData().catch(console.error);
    }, [currentPage]);

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
        // Đang ở giữa (VD: < 1 ... 14 15 16 ... 28 >)
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
            <h1>Genre List</h1>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="success" as={Link} to="/them-moi-the-loai">Add</Button>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            {isLoading ? (
                <div className="text-center"><Spinner animation="border" /></div>
            ) : (
                <>
                    <GenreTable genreList={genres} />

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