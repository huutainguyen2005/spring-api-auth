import { Button, Container, Pagination, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAlbumList } from "../../api/albumApi.js";

function AlbumTableRow({ album, page }) {
  return (
    <tr>
      <td>{album.albumId}</td>
      <td>{album.title}</td>
      <td>{album.artist?.name || "Unknown"}</td>
      <td>
        <Button
          size="sm"
          as={Link}
          to={`/chinh-sua-album/${album.albumId}?page=${page}`}
        >
          Edit
        </Button>{" "}
        <Button
          variant="danger"
          size="sm"
          as={Link}
          to={`/xoa-album/${album.albumId}?page=${page}`}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

function AlbumTable({ list, page }) {
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: "10%" }}>ID</th>
          <th style={{ width: "50%" }}>Title</th>
          <th style={{ width: "20%" }}>Artist</th>
          <th style={{ width: "20%" }}>Actions</th>
        </tr>
      </thead>

      <tbody>
        {list.length > 0 ? (
          list.map((album) => (
            <AlbumTableRow key={album.albumId} album={album} page={page} />
          ))
        ) : (
          <tr>
            <td colSpan={4}>No albums found</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;
  const size = 10;

  useEffect(() => {
    getAlbumList(page, size).then((resp) => {
      setAlbums(resp.data.content);
      setTotalPages(resp.data.totalPages);
    });
  }, [page, size]);

  const renderPaginationItems = () => {
    const items = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={() => navigate(`/danh-sach-album?page=${i}`)}
        >
          {i}
        </Pagination.Item>,
      );
    }

    return items;
  };

  return (
    <Container>
      <h1 className="mt-4">Album list</h1>

      <div className="text-end mb-3">
        <Button
          size="sm"
          as={Link}
          variant="success"
          to={`/them-moi-album?page=${page}`}
        >
          Add
        </Button>
      </div>

      <AlbumTable list={albums} page={page} />

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => navigate(`/danh-sach-album?page=${page - 1}`)}
          />

          {renderPaginationItems()}

          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => navigate(`/danh-sach-album?page=${page + 1}`)}
          />
        </Pagination>
      </div>
    </Container>
  );
}
