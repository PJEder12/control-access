import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Axios from "axios";

//CSS:
import "./style/EditUser.css";

const edit_user_id = document.getElementById("edit_user");

const EditUser = (props) => {
  const ref_select = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [finalStartDate, setFinalStartDate] = useState(null);
  const edit_user_all_url = "http://localhost:52000/api/edituser";
  const edit_user_only_hours_url = "http://localhost:52000/api/edituseronlyhours";
  const edit_user_only_auth_url = "http://localhost:52000/api/edituseronlyauth";

  const form_handle = (e) => {
    e.preventDefault();

    if (startDate && finalStartDate && ref_select.current.value !== "2") {
      const initial_hour = startDate.toString().slice(16, 21);
      const final_hour = finalStartDate.toString().slice(16, 21);
      const information_edit_user = {
        id: props.id,
        hora_inicio: initial_hour,
        hora_final: final_hour,
        id_estado: ref_select.current.value,
      };
      Axios.post(edit_user_all_url, information_edit_user).then(
        (response) => {
          console.log(response.data);
        }
      );
    } else if (startDate && finalStartDate) {
      const initial_hour = startDate.toString().slice(16, 21);
      const final_hour = finalStartDate.toString().slice(16, 21);
      const information_edit_user = {
        id: props.id,
        hora_inicio: initial_hour,
        hora_final: final_hour,
      };
      Axios.post(edit_user_only_hours_url, information_edit_user).then(
        (response) => {
          console.log(response.data);
        }
      );
    } else if (ref_select.current.value !== "0") {
      const information_edit_user = {
          id: props.id,
        id_estado: ref_select.current.value,
      };
      Axios.post(edit_user_only_auth_url, information_edit_user).then(
        (response) => {
          console.log(response.data);
        }
      );
    }
    props.dispatchUseEffect();
    props.closeModal();
  };

  const handleClose = () => {
    setStartDate(null);
    setFinalStartDate(null);
    ref_select.current.value = null;
    props.closeModal();
  };

  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="edit_user_modal_component">
      <div className="edit_user_modal_component__container">
        <button
          onClick={handleClose}
          className="edit_user_modal_component__close_button"
        >
          X
        </button>
        <h3>Editar Usuarios</h3>
        <p>Sólo digita los campos que quieres editar.</p>
        <Form className="mt-2">
          <Form.Group>
            <div className="select_hour_register">
              <label>Seleccionar hora inicial de ingreso</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="input_hour_register"
              />
            </div>
          </Form.Group>

          <Form.Group>
            <div className="select_hour_register">
              <label>Seleccionar hora final de ingreso</label>
              <DatePicker
                selected={finalStartDate}
                onChange={(date) => setFinalStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                className="input_hour_register"
              />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>¿Está autorizado o no?</Form.Label>
            <Form.Control as="select" ref={ref_select}>
              <option value="2">Asignar persmisos</option>
              <option value="0">Autorizado</option>
              <option value="1">Vetado</option>
            </Form.Control>
          </Form.Group>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="danger" type="submit" block onClick={form_handle}>
              Aceptar cambios
            </Button>
          </div>
        </Form>
      </div>
    </div>,
    edit_user_id
  );
};

export default EditUser;
