import React from "react";
import { Navbar, Nav } from "react-bootstrap";

import "./style/Navbar.css";

const NavbarComponent = () => {
  return (
    <div>
      <Navbar className="fixed-top" bg="light" expand="lg">
        <Navbar.Brand href="/">Control Access</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Registrar usuarios</Nav.Link>
            <Nav.Link href="login">Modificar usuarios</Nav.Link>
            <Nav.Link href="#home">Historial</Nav.Link>
            <Nav.Link href="/lastuser">En vivo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
