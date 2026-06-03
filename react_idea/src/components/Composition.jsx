import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";

// Class Component -> Legacy code
// class Header extends Component {}

// Functional Component
export function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href={"#"}>FPT Music Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Dropdown Artists */}
                        <NavDropdown title="Artists" id="artists-dropdown">
                            <NavDropdown.Item as={Link} to="/artists">List all artists</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/artists/add">Add new artists</NavDropdown.Item>
                        </NavDropdown>

                        {/* Dropdown Albums */}
                        <NavDropdown title="Albums" id="albums-dropdown">
                            <NavDropdown.Item as={Link} to="/albums">List all albums</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/albums/add">Add new album</NavDropdown.Item>
                        </NavDropdown>

                        {/* Dropdown Genres */}
                        <NavDropdown title="Genres" id="genres-dropdown">
                            <NavDropdown.Item as={Link} to="/genres">List all genre</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/genres/add">Add new genre</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export function Footer() {
    return (
        <footer className="bg-dark text-white text-center py-4 mt-auto">
            <p className="mb-1">FPTU Cantho</p>
            <p className="mb-0">Music Store &copy; 2026</p>
        </footer>
    );
}