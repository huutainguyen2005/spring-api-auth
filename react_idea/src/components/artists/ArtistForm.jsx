import {Container, InputGroup, Form, Button, Row, Col, Alert} from "react-bootstrap";
import {FavoriteGenre} from "../genres/FavoriteGenre.jsx";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export function ArtistForm() {
    const [name, setName] = useState('');
    // Hook navigate de di chuyen giua cac route
    const navigate = useNavigate();
    // API de create artist -> Check lai ben BE
    // NGhien cuu: disabled button tranh submit nhieu lan
    const [submitting, setSubmitting] = useState(false);
    //             error msg
    const [error, setError] = useState(null);

    // Edit Mode -> FE form create or edit? -> co ton tai id trong param
    const {id} = useParams();
    const isEditMode = !!id;

    // Conditional Fetch API de lay thong tin Artist can edit
    // /api/v1/artists/id
    useEffect(() => {
        if (isEditMode) {
            fetch(`http://localhost:8080/api/v1/artists/${id}`)
                .then(res => {
                    if (!res.ok) {
                        if (res.status === 404) {
                            // not found
                        }
                        // throw new Error
                    }
                    return res.json();
                })
                .then(data => {
                    setName(data.name);
                })
                .catch(err => setError(err.message));
        }
    }, [isEditMode, id]);


    // Gia lap sleep (wait 2s)
    const sleep = (ms) => new Promise((evo) => setTimeout(evo, ms));

    const handleSubmit = async (e) => {
        // Bao cho browser biet chung ta ko dung hanh vi mac dinh khi submit form
        e.preventDefault();
        console.log('Form data: ', {name});
        setSubmitting(true);

        try {
            await sleep(2000);
            // Bai tap
            // Viet lai logic de handle case
            /********************  EDIT *********************/
            if (isEditMode) {
                const res = await fetch(`http://localhost:8080/api/v1/artists/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name})
                });
                if (!res.ok) {
                    const payload = await res.json();
                    // Toan tu || (A || B) trong phep assign co nghia A null -> B, A != null -> A
                    const msg = payload?.message || 'Failed to edit artist';
                    throw new Error(msg);
                }
                if (res.status === 200) {
                    // redirect ve list
                    navigate('/danh-sach-nghe-si');
                }
            } else {
                /********************  CREATE *******************/
                    // fetch -> DataType la Promise<T>
                    // await fetch -> return ve T
                const res = await fetch('http://localhost:8080/api/v1/artists', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({name}) // stringify -> chuyen 1 object json ve String
                    });
                // Neu error xuat hien (res KHONG ok)
                if (!res.ok) {
                    const payload = await res.json();
                    // Toan tu || (A || B) trong phep assign co nghia A null -> B, A != null -> A
                    const msg = payload?.message || 'Failed to create artist';
                    throw new Error(msg);
                }
                // Neu tra ve code 200
                if (res.status === 201) {
                    // redirect ve list
                    navigate('/danh-sach-nghe-si');
                }
            }
        } catch (e) {
            setError(e.message);
        } finally {
            setSubmitting(false);
        }
    };
    // useEffect(fn, deps);

    // fetch() ->

    // Handle form submitted
    // 2 approaches
    // 1 -> bat su kien click cua button
    // 2 -> bat su kien form on submit

    // Prevent default behavior


    return (
        <Container>
            <h1>{isEditMode ? 'Edit artist' : 'Add new artist'}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label htmlFor="basic-url">Name</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control type="text" value={name} required
                                  onChange={(e) => setName(e.target.value)}
                    />
                </InputGroup>
                {
                    // !!error -> error != null
                    !!error && // conditional render -> A && B -> A true -> return B, A false -> return A
                    <Row className={''}>
                        <Col xs={12}>
                            <Alert variant="danger">
                                {error.toString()}
                            </Alert>
                        </Col>
                    </Row>
                }
                <Button variant={"success"}
                        className={"me-1"}
                        type="submit"
                        disabled={submitting}
                >
                    {submitting ? 'Saving' : 'Save'}
                </Button>
                <Button variant={"secondary"} className={"me-1"}>Reset</Button>
                <Button variant={"outline-secondary"}>Back to list</Button>

            </Form>


            <Row className={'mt-3'}>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
                <Col md={3}>
                    <FavoriteGenre/>
                </Col>
            </Row>
        </Container>

    );
}