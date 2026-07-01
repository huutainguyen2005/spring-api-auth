import { Button, Container, Pagination, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { getGenreList } from "../../api/genreApi";

export function GenreList() {
  const [genres, setGenres] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1;
  const size = 10;

  useEffect(() => {
    getGenreList(page, size).then((res) => {
      setGenres(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  }, [page]);

  const changePage = (newPage) => {
    navigate(`/danh-sach-the-loai?page=${newPage}`);
  };

  return (
    <Container>
      <h1 className="mt-4">Genre list</h1>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Popularity</th>
            <th>Active</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {genres.length > 0 ? (
            genres.map((g) => (
              <tr key={g.genreId}>
                <td>{g.genreId}</td>
                <td>{g.name}</td>
                <td>{g.description}</td>
                <td>{g.popularityScore}</td>
                <td>{g.isActive ? "Yes" : "No"}</td>
                <td>{g.createdAt}</td>
                <td>{g.updatedAt}</td>
                <td>
                  <Button
                    size="sm"
                    as={Link}
                    to={`/chinh-sua-the-loai/${g.genreId}?page=${page}`}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    as={Link}
                    to={`/xoa-the-loai/${g.genreId}?page=${page}`}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No genres</td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => changePage(page - 1)}
          />

          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === page}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}

          <Pagination.Next
            disabled={page === totalPages}
            onClick={() => changePage(page + 1)}
          />
        </Pagination>
      </div>
    </Container>
  );
}
