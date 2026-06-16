import {Alert, Button, Container, Form, Pagination, Spinner, Table} from "react-bootstrap";
import {Link, useSearchParams} from "react-router-dom";
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
                    as={Link} to={`/chinh-sua-nghe-si/${artist.artistId}`}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    as={Link} to={`/xoa-nghe-si/${artist.artistId}`}
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
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

    // State artists
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State phân trang
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const size = parseInt(searchParams.get("size")) || 10
    // const [currentPage, setCurrentPage] = useState(1);
    // const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [jumpPage, setJumpPage] = useState("");

    // Call API -> get artist list
    // Inline arrow fn

    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage, size: size });
    };

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/artists?page=${currentPage}&size=${size}`);
                if (!res.ok) {
                    throw new Error(`Network error or server not responding (${res.status})!`);
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
    }, [API_BASE_URL, currentPage, size]); // Chạy 1 lần duy nhất khi component được mount

    const handleInputChange = (e) => {
        const val = e.target.value;

        // Nếu người dùng xóa trắng ô input (để chuẩn bị gõ số mới) -> Cứ cho phép xóa
        if (val === "") {
            setJumpPage("");
            return;
        }

        const parsed = parseInt(val, 10);
        if (!isNaN(parsed)) {
            if (parsed < 1) {
                setJumpPage(1); // Gõ 0 hoặc số âm -> Nhảy ngay sang 1
            } else if (parsed > totalPages) {
                setJumpPage(totalPages); // Gõ vượt quá -> Nhảy ngay sang tổng số trang
            } else {
                setJumpPage(parsed); // Nhập đúng -> Hiển thị bình thường
            }
        }
    };

    // Hàm gọi khi ấn Enter (Lúc này số đã được nắn chuẩn sẵn rồi)
    const handleJumpPage = (e) => {
        if (e.key === 'Enter') {
            // Chỉ chuyển trang nếu ô input không bị bỏ trống
            if (jumpPage !== "") {
                handlePageChange(Number(jumpPage));
            }
        }
    };

    let paginationItems = [];

    if (totalPages <= 10) {
        for (let number = 1; number <= totalPages; number++) {
            paginationItems.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>
            );
        }
    } else {
        // Đang ở những trang đầu (VD: < 1 2 3 4 5 6 7 ... 28 >)
        if (currentPage <= 5) {
            for (let number = 1; number <= 7; number++) {
                paginationItems.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
            paginationItems.push(<Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>);
        }
        // Đang ở những trang cuối (VD: < 1 ... 22 23 24 25 26 27 28 >)
        else if (currentPage >= totalPages - 4) {
            paginationItems.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>1</Pagination.Item>);
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
            for (let number = totalPages - 6; number <= totalPages; number++) {
                paginationItems.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
        }
        else {
            paginationItems.push(<Pagination.Item key={1} onClick={() => handlePageChange(1)}>1</Pagination.Item>);
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-start" disabled />);
            for (let number = currentPage - 2; number <= currentPage + 2; number++) {
                paginationItems.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                        {number}
                    </Pagination.Item>
                );
            }
            paginationItems.push(<Pagination.Ellipsis key="ellipsis-end" disabled />);
            paginationItems.push(<Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>{totalPages}</Pagination.Item>);
        }
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
                        <div className="d-flex justify-content-center align-items-center mt-4">
                            <Pagination className="mb-0 me-4">
                                <Pagination.Prev
                                    onClick={() => handlePageChange(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                />

                                {paginationItems}

                                <Pagination.Next
                                    onClick={() => handlePageChange(prev => Math.min(prev + 1, totalPages))}
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