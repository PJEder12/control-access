import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import login_img from "../images/login.svg";
import "./style/Login.css";

const Login = () => {
    const [username, set_username] = useState("");
    const [password, set_password] = useState("");

  const handle_form = (e) => {
    e.preventDefault();
    console.log(password);
    console.log(username);
  };
  return (
    <div>
      <div className="container-fluid">
        <Row>
          <Col
            md={6}
            sm={12}
            className="aligns-item-center"
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card style={{ width: "70%" }}>
              <Card.Body>
                <Card.Title className="text-center d-flex justify-content-center">
                  {" "}
                  <h2>Login</h2>
                </Card.Title>
                <Form className="mt-2">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control type="text" placeholder="Digite el usuario" onChange={(e) => set_username(e.target.value)}/>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Digite la contraseña"
                      onChange={(e) => set_password(e.target.value)}
                    />
                  </Form.Group>

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="info"
                      type="submit"
                      onClick={(e) => handle_form(e)}
                    >
                      Enviar
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col style={{ height: "100vh" }} md={6} className="d-none d-md-block">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={login_img}
                alt="login"
                width={400}
                height={500}
                style={{ margin: "0 auto" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
