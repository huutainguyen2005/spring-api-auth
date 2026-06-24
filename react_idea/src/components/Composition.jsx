import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';

// Class component -> Legacy code
// class Header extends Component

// Logic fn
// Naming convention -> camelCase()
// function calculateSubTotal() {
//     return ...
// }

// Functional Component
// Naming convention -> PascalCase | UpperCamelCase cho tên của Component
export function Header() {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand href={"#"}>FPT Music Store</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className={"me-auto"}>
                        <NavDropdown title={"Artists"}>
                            <NavDropdown.Item as={Link} to={'/danh-sach-nghe-si'}>Artists list</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to={'/them-moi-nghe-si'}>Add new</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={"Albums"}>
                            <NavDropdown.Item>Albums list</NavDropdown.Item>
                            <NavDropdown.Item>Add new</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={"Genres"}>
                            <NavDropdown.Item>Genres list</NavDropdown.Item>
                            <NavDropdown.Item>Add new</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        Login
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>);
}