import React, { useState, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Axios from "axios";

//CSS
import "./style/Register.css";

//Images:
import complete_image from "../images/complete.svg";
import error_image from "../images/error.svg";

//Personal components:
import Modal from "../components/Modal";
import { storage } from "../Firebase";
import Camera_Component from "../components/Register/Camera";

const Register = () => {
  const [name, set_name] = useState("");
  const [position, set_position] = useState("");
  const [take_photo, set_take_photo] = useState();
  const [option_photo, set_option_photo] = useState(0);
  const [shot_photo, set_shot_photo] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [finalStartDate, setFinalStartDate] = useState(null);
  const [is_camera_open, set_is_camera_open] = useState(false);
  const ref_name = useRef(null);
  const ref_position = useRef(null);
  const ref_image = useRef(null);
  const ref_select = useRef(null);
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [img_check_number, set_img_check_number] = useState(0);
  const [modal_content, set_modal_content] = useState("");
  const import_photo_url = "http://localhost:52000/api/takephoto";

  const handle_select = () => {
    const value_select = ref_select.current.value;

    if (value_select === "1") {
      set_option_photo(1);
    } else if (value_select === "2") {
      set_option_photo(2);
    } else {
      set_option_photo(0);
    }
  };

  const handle_file_select = () => {
    set_shot_photo(1);
  };

  const handleTakePhoto = (file) => {
    set_take_photo(file);
    set_shot_photo(2);
  };

  const form_handle = (e) => {
    e.preventDefault();

    if (name && position && startDate && finalStartDate) {
      const ref_image_condition = ref_image.current !== null;

      if (ref_image_condition || take_photo) {
        if (shot_photo === 1) {
          const ref_image_value = ref_image.current.files[0];

          console.log("IMPORT PHOTO");

          const uploadTask = storage
            .ref(`fotos/${ref_image_value.name}`)
            .put(ref_image_value);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("fotos")
                .child(ref_image_value.name)
                .getDownloadURL()
                .then((url) => {
                  const initial_hour = startDate.toString().slice(16, 21);
                  const final_hour = finalStartDate.toString().slice(16, 21);
                  const information_user = {
                    nombre: name,
                    cargo: position,
                    hora_inicio: initial_hour,
                    hora_final: final_hour,
                    link_img: url,
                  };
                  console.log(information_user);
                  Axios.post(import_photo_url, information_user).then(
                    (response) => {
                      console.log(response.data);
                    }
                  );
                });
            }
          );

          //MODAL HERE
          set_img_check_number(1);
          set_modal_content("El proceso ha sido exitoso");
          set_is_modal_open(true);

          //Clean the form
          ref_name.current.value = "";
          ref_position.current.value = "";
          ref_image.current.value = null;
          setStartDate(null);
          setFinalStartDate(null);
          ref_select.current.value = "0";
          set_option_photo(0);
        } else if (shot_photo === 2) {
          const uploadTask = storage
            .ref(`fotos/${take_photo.name}`)
            .put(take_photo);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error);
            },
            () => {
              storage
                .ref("fotos")
                .child(take_photo.name)
                .getDownloadURL()
                .then((url) => {
                  const initial_hour = startDate.toString().slice(16, 21);
                  const final_hour = finalStartDate.toString().slice(16, 21);
                  const information_user = {
                    nombre: name,
                    cargo: position,
                    hora_inicio: initial_hour,
                    hora_final: final_hour,
                    link_img: url,
                  };
                  console.log(information_user);
                  Axios.post(import_photo_url, information_user).then(
                    (response) => {
                      console.log(response.data);
                    }
                  );
                });
            }
          );

          set_img_check_number(1);
          set_modal_content("El proceso ha sido exitoso");
          set_is_modal_open(true);

          //Clean the form
          ref_name.current.value = "";
          ref_position.current.value = "";
          setStartDate(null);
          setFinalStartDate(null);
          ref_select.current.value = "0";
          set_option_photo(0);
        }
      } else {
        set_img_check_number(2);
        set_modal_content("Error: No ha subido o no se ha tomado una foto");
        set_is_modal_open(true);
      }
    } else {
      set_img_check_number(2);
      set_modal_content("Error: Digite los campos correctamente");
      set_is_modal_open(true);
    }
  };

  const handle_open_modal_take_photo = (e) => {
    e.preventDefault();
    set_is_camera_open(true);
  }

  const closeModal = () => {
    set_is_modal_open(false);
    set_is_camera_open(false);
    set_modal_content("");
    set_img_check_number(0);
  };

  return (
    <div className="register_container">
      <h1>Registrar un nuevo usuario</h1>
      <p>En este apartado puedes registrar un nuevo usuario.</p>

      <section className="form_section">
        <Card>
          <Card.Body>
            <Card.Title className="text-center d-flex justify-content-center">
              {" "}
            </Card.Title>
            <Form className="mt-2">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre completo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite el nombre completo de la persona"
                  ref={ref_name}
                  autoComplete="off"
                  onChange={(e) => set_name(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite el cargo de la persona"
                  ref={ref_position}
                  autoComplete="off"
                  onChange={(e) => set_position(e.target.value)}
                />
              </Form.Group>

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
                <Form.Label>¿Subir foto o tomar foto?</Form.Label>
                <Form.Control
                  as="select"
                  onClick={handle_select}
                  ref={ref_select}
                >
                  <option value="0">Escoger entre subir o tomar foto</option>
                  <option value="1">Subir foto</option>
                  <option value="2">Tomar foto</option>
                </Form.Control>
              </Form.Group>

              {option_photo === 1 && (
                <>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Subir foto</Form.Label>
                    <Form.Control
                      type="file"
                      ref={ref_image}
                      onClick={handle_file_select}
                    />
                  </Form.Group>
                </>
              )}

              {option_photo === 2 && (
                <>
                  <Form.Group controlId="formBasicPassword">
                    <label>Tomar foto</label>
                    <div className="take_photo_modal">
                      <button onClick={handle_open_modal_take_photo}>Tomar foto</button>
                      <p>
                        {take_photo
                          ? "Foto tomada"
                          : "No se ha tomado una foto"}
                      </p>
                    </div>
                  </Form.Group>
                </>
              )}

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="danger"
                  type="submit"
                  block
                  onClick={form_handle}
                >
                  Enviar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </section>

      <Modal isOpen={is_modal_open} closeModal={closeModal}>
        <h1 className="modal_register_h1">{modal_content}</h1>
        {img_check_number === 1 && (
          <img
            className="modal_register_img"
            src={complete_image}
            alt="modal_img"
          />
        )}
        {img_check_number === 2 && (
          <img
            className="modal_register_img"
            src={error_image}
            alt="modal_img"
          />
        )}
      </Modal>
      <Camera_Component
        isOpen={is_camera_open}
        closeModal={closeModal}
        handle_take_photo={handleTakePhoto}
      />
    </div>
  );
};

export default Register;
