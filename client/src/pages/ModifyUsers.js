import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Axios from "axios";

//CSS
import "./style/ModifyUsers.css";

const ModifyUsers = () => {
  const [information_users, set_information_users] = useState([]);
  const [loading_boolean, set_loading_boolean] = useState(false);
  const modify_user_url = "http://localhost:52000/api/modifyusers";

  useEffect(() => {
    Axios.get(modify_user_url).then((response) => {
      console.log(response.data);
      set_information_users(response.data);
      set_loading_boolean(true);
    });
  }, [loading_boolean]);

  if (loading_boolean) {
    return (
      <div className="modify_users_container">
        <h1>Modificar la información y permisos de los usuarios</h1>
        <p>
          En esta sección puedes modificar el nombre, cargo, rango de hora
          permitido para el ingreso y la autorización (si el usuario está vetado
          o no) de los usuarios.
        </p>
        <div className="search_filter_users_container">
          <i class="gg-search"></i>
          <input type="text" placeholder="Filtrar por nombre..." />
        </div>
        <section className="cards_user_section">
          {information_users.map((info) => {
            return (
              <div className="card_user_container">
                <Card>
                  <Card.Img variant="top" src={info.link_img} alt="face" />
                  <Card.Body>
                    <Card.Title>{info.nombre}</Card.Title>
                    <Card.Text>
                      <span>Cargo:</span> {info.cargo}
                    </Card.Text>
                    <Card.Text>
                      <span>Hora de acceso:</span> {info.hora_inicio} - {info.hora_final}
                    </Card.Text>
                    <Card.Text>
                      <span>Estado:</span> {info.estado}
                    </Card.Text>
                    <Button variant="danger" block>Editar</Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </section>
      </div>
    );
  } else {
    return <></>;
  }
};

export default ModifyUsers;
