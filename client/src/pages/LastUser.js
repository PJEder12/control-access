import React, { useState, useEffect} from "react";
import Axios from "axios";

//CSS:
import "./style/LastUser.css";

const LastUser = () => {
  return (
    <div className="last_user_container">
      <h1>Ultimas personas autorizadas</h1>
      <p>
        En este apartado se puede visualizar quién fue la última persona que
        ingresó y la última persona que salió.
      </p>
      <section className="last_get_in_section">
        <h4>Última persona que ingresó</h4>
      </section>
    </div>
  );
};

export default LastUser;
