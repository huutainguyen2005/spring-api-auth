import {Button, Tablet} from 'react-bootstrap';
import {Link} from "react-router-dom";

function GenreTableRow({genre}) {
    return (
        <tr>
            <td>{genre.id}</td>
            <td>{genre.name}</td>
            <td>{genre.description}</td>
            <td>{genre.popularityScore}</td>
            <td>
                <Button as={Link} to={`/api/v1/genres/${genre.id}`}>Edit</Button>
            </td>
        </tr>
    )
}