import React, { useState, useEffect } from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";

//CSS:
import "./style/LastUser.css";

const LastUser = () => {
  const [information_users, set_information_users] = useState([]);
  const [loading_boolean, set_loading_boolean] = useState(false);
  const last_user_url = "http://localhost:52000/api/lastuser";

  useEffect(() => {
    Axios.get(last_user_url).then((response) => {
      console.log(response.data[0].link_img);
      set_information_users(response.data);
      set_loading_boolean(true)
    });
  }, [loading_boolean]);

  setInterval(() => {
    Axios.get(last_user_url).then((response) => {
      console.log(response.data[0].link_img);
      set_information_users(response.data);
      set_loading_boolean(true)
    });
  }, 5000)

  if(loading_boolean) {
    return (
        <div className="last_user_container">
          <h1>Ultimas personas autorizadas</h1>
          <p>
            En este apartado se puede visualizar quién fue la última persona que
            ingresó y la última persona que salió.
          </p>
          <section className="last_get_in_section">
            <h4>Última persona que ingresó</h4>
            <div className="last_get_in_img_container">
              <img src={information_users[0].link_img} />
            </div>
            <p><span>Nombre:</span> {information_users[0].nombre}</p>
            <p><span>Cargo:</span> {information_users[0].cargo}</p>
            <p><span>Fecha de ingreso:</span> {information_users[0].fecha}</p>
          </section>
    
          <section className="last_get_in_section">
            <h4>Última persona que salió</h4>
            <div className="last_get_in_img_container">
              <img src={information_users[1].link_img} />
            </div>
            <p><span>Nombre:</span> {information_users[1].nombre}</p>
            <p><span>Cargo:</span> {information_users[1].cargo}</p>
            <p><span>Fecha de ingreso:</span> {information_users[1].fecha}</p>
          </section>
        </div>
      );
  } else {
      return <></>;
  }

 
};

export default withRouter(LastUser);
