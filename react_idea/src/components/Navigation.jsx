import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

function Navigation() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">FPT Music Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Dropdown Artists */}
                        <NavDropdown title="Artists" id="artists-dropdown">
                            <NavDropdown.Item href="/artists">List all artists</NavDropdown.Item>
                            <NavDropdown.Item href="/artists/add">Add new artists</NavDropdown.Item>
                        </NavDropdown>

                        {/* Dropdown Albums */}
                        <NavDropdown title="Albums" id="albums-dropdown">
                            <NavDropdown.Item href="/albums">List all albums</NavDropdown.Item>
                            <NavDropdown.Item href="/albums/add">Add new album</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navigation;