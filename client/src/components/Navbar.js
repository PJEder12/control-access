import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./style/Navbar.css";

const NavbarComponent = () => {
  return (
    <div>
      <Navbar className="fixed-top" bg="light" expand="lg">
        <Navbar.Brand href="/">Control Access</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <NavLink
                exact
                to="/"
                className="navbar_option"
                activeClassName="navbar_option_active"
              >
                Registrar usuarios
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                exact
                to="/modifyusers"
                className="navbar_option"
                activeClassName="navbar_option_active"
              >
                Modificar usuarios
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                exact
                to="/history"
                className="navbar_option"
                activeClassName="navbar_option_active"
              >
                Historial
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink
                exact
                to="/lastuser"
                className="navbar_option"
                activeClassName="navbar_option_active"
              >
                En vivo
              </NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
