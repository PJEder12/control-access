import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import Axios from 'axios';

const Logout = () => {
  const logoutAPIURL = "http://localhost:52000/api/logout";

  useEffect(() => {
    Axios.post(logoutAPIURL)
      .then(() => {
        window.location.href = '/login';
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <></>;
};

export default withRouter(Logout);