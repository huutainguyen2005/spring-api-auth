import {Button, Container, Pagination, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {apiInstance} from "../ApiCore.jsx";
import {getList} from "../../api/artistApi.js";

// AXIOS

// 1. What is axios?
// 2. Installation `npm i axios`
// 3. Use axios to call APIs (endpoint, body, response...)
// - GET
// - POST
// - PUT
// - DELETE
// - ....
// 4. Replace logic: fetch by axios
// 5. Comparison Axios vs fetch





function ArtistTableRow({key, artist}) {
    return (
        <tr key={key}>
            <td>{artist.id}</td>
            <td>{artist.name}</td>
            <td> {// String interpolate `
            }
                <Button size="sm" as={Link} to={`/chinh-sua-nghe-si/${artist.id}`}>Edit</Button>
                <Button variant="danger" size="sm" as={Link} to={`/xoa-nghe-si/${artist.id}`}>Delete</Button>
            </td>
        </tr>
    );
}

// Props -> Data được truyền từ parent vào Component
function ArtistTable({list}) {
    return (
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
                list.length > 0 ?
                    list.map(ar => <ArtistTableRow key={ar.id} artist={ar}/>) :
                    <tr>
                        <td colSpan={3}>There is no artists. Please add a new one bro!</td>
                    </tr>
            }
            </tbody>
        </Table>
    );
}

export function ArtistList() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    // state artists
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [artists, setArtists] = useState([]);
    const renderPaginationItems = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === page}
                    onClick={() => setPage(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    }
    // Call API -> get artist list
    // Inline arrow fn
    useEffect(() => {
        // code
        // fetch(`${API_BASE_URL}/api/v1/artists?page=${page}&size=${size}`)
        //     .then(res => {
        //         return res.json()
        //     })
        //     .then(data => {
        //         // setPage()
        //         // setSize()
        //         setArtists(data.content)
        //         setTotalPages(data.totalPages);
        //     });
        getList(page, size).then(resp => {
            setArtists(resp.data.content);
            setTotalPages(resp.data.totalPages);
        });

        // TASK:
        // Chuyển các logic fetch API sang axios
        // Xem ArtistForm.jsx
        // getArtistById(id)
        // createArtist()
        // updateArtist(id, {})
        // Xem ArtistDelete.jsx
        // deleteArtist(id)

        // code
    }, [API_BASE_URL, page, size]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/artists", )
            .then(response => {
                console.log(response);
                console.log(response.data);
            });
    }, []);

    return (
        <Container>
            <h1>Artist list</h1>
            <ArtistTable list={artists}/>
            <Pagination>
                <Pagination.Prev/>
                {renderPaginationItems()}
                <Pagination.Next/>
            </Pagination>
        </Container>
    );
}