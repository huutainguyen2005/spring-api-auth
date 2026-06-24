import {Alert, Button, Container, Form} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function ArtistDeletePage({children}) {
    return (
        <Container>
            <h1>Delete artist</h1>
            {children}
        </Container>
    );
}

export function ArtistDelete() {
    const [artist, setArtist] = useState({});
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/api/v1/artists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (res.status === 204) {
                navigate('/danh-sach-nghe-si');
            }
        } catch (ex) {
            setError(ex.message);
        }
    };

    // Call GET api endpoint để lấy thông tin chi tiết của Artist đang cần Delete
    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/artists/${id}`)
            .then(res => {
                if (!res.ok) {
                    if (res.status === 404) {
                        setNotFound(true);
                    }
                    throw new Error('Error');
                }
                return res.json();
            })
            .then(data => {
                setArtist(data);
                setNotFound(false);
            })
            .catch(err => {
                setError(err.message)
            });
    }, [id]);

    if (notFound) {
        return (
            <ArtistDeletePage>
                <Alert variant='danger'>Artist with id {id} not found.</Alert>
                <Button>Back to list</Button>
            </ArtistDeletePage>
        );
    }
    /*
     notfound
     <Container>
        <h1>Delete artist</h1>
        <Alert>Ko tim thay artist voi id ...
        button back to list
    </Container>


     <Container>
        <h1>Delete artist</h1>
        <p>Are you sure to delete artist {artist.name} with {artist.id}</p>
        button xoa + button back to list
    </Container>
    props
    <ArtistDeletePage />


     */

    return (
        <ArtistDeletePage>
            <p>Are you sure to delete artist {artist.name} with {artist.id}</p>
            <Form onSubmit={handleDelete}>
                <Button type='submit'>Delete</Button>
                <Button>Back to list</Button>
            </Form>
        </ArtistDeletePage>
    );
}