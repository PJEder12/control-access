import React from "react";
import {Navbar, Nav} from "react-bootstrap";

import "../components/style/Navbar.css";

const Home = () => {
  return (
    <div>
      <Navbar className="fixed-top" bg="light" expand="lg">
        <Navbar.Brand href="#home">Control Access</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" >
            <Nav.Link href="#home">Registrar usuarios</Nav.Link>
            <Nav.Link href="#link">Modificar usuarios</Nav.Link>
            <Nav.Link href="#home">Historial</Nav.Link>
            <Nav.Link href="#link">En vivo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Home;
