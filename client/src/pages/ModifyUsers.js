import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import {withRouter} from "react-router-dom";
import Axios from "axios";

//CSS
import "./style/ModifyUsers.css";

//Personal modules:
import EditUser from "../components/ModifyUsers/EditUser.js";

const ModifyUsers = () => {
  const [information_users, set_information_users] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading_boolean, set_loading_boolean] = useState(false);
  const [id_user, set_id_user] = useState(0);
  const [is_open_modal, set_is_open_modal] = useState(false);
  // const [modify_use_effect, set_modify_use_effect] = useState(false);
  const modify_user_url = "http://localhost:52000/api/modifyusers";
  let iterator = 0;
  let enableEmpty = true;
  let showEmptySearch = false;

  useEffect(() => {
    Axios.get(modify_user_url).then((response) => {
      console.log(response.data);
      set_information_users(response.data);
      set_loading_boolean(true);
    });
  }, [loading_boolean]);

  const handlerSearch = (e) => {
    setSearchTerm(e);
    iterator = 0;
    enableEmpty = true;
    showEmptySearch = false;
  };

  const handle_edit = (id) => {
    set_id_user(id);
    set_is_open_modal(true);
  };

  const handle_use_effect = () => {
    set_loading_boolean(!loading_boolean);
  };

  const closeModal = () => {
    set_is_open_modal(false);
  };

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
          <input
            type="text"
            placeholder="Filtrar por nombre..."
            onChange={(e) => handlerSearch(e.target.value)}
          />
        </div>
        <section className="cards_user_section">
          {information_users
            .filter((val) => {
              iterator += 1;
              if (searchTerm === "") {
                return val;
              } else if (
                val.nombre
                  .toString()
                  .toLowerCase()
                  .slice(0, searchTerm.length)
                  .includes(searchTerm.toLocaleLowerCase())
              ) {
                enableEmpty = false;
                return val;
              } else if (
                iterator == information_users.length &&
                enableEmpty == true
              ) {
                showEmptySearch = true;
              }
            })
            .map((info) => {
              return (
                <div className="card_user_container">
                  <Card>
                    <Card.Img variant="top" src={info.link_img} alt="face" />
                    <Card.Body>
                      <Card.Title>{info.nombre}</Card.Title>
                      <Card.Text className="d-block card_modify_user">
                        <span>Cargo:</span> {info.cargo}
                      </Card.Text>
                      <Card.Text className="d-block card_modify_user">
                        <span>Hora de acceso:</span> {info.hora_inicio} -{" "}
                        {info.hora_final}
                      </Card.Text>
                      <Card.Text className="d-block card_modify_user">
                        <span>Estado:</span> {info.estado}
                      </Card.Text>
                      <Button
                        variant="danger"
                        block
                        onClick={() => handle_edit(info.id)}
                      >
                        Editar
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
        </section>
        <EditUser
          isOpen={is_open_modal}
          closeModal={closeModal}
          id={id_user}
          dispatchUseEffect={handle_use_effect}
        />
      </div>
    );
  } else {
    return <></>;
  }
};

export default withRouter(ModifyUsers);
