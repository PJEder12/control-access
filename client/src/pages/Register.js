import React, { useState, useRef } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

//CSS
import "./style/Register.css";

//Images:
import complete_image from "../images/complete.svg";
import error_image from "../images/error.svg";

//Personal components:
import Modal from "../components/Modal";
import { storage } from "../Firebase";

const Register = () => {
  const [name, set_name] = useState("");
  const [position, set_position] = useState("");
  const [take_photo, set_take_photo] = useState("");
  const ref_name = useRef(null);
  const ref_position = useRef(null);
  const ref_image = useRef(null);
  const [is_modal_open, set_is_modal_open] = useState(false);
  const [img_check_number, set_img_check_number] = useState(0);
  const [modal_content, set_modal_content] = useState("");

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleTakePhoto = (dataUri) => {
    var file = dataURLtoFile(dataUri, "hello.txt");
    set_take_photo(file);
  };

  const form_handle = (e) => {
    e.preventDefault();
    const ref_image_value = ref_image.current.files[0];

    if (name && position && ref_image_value) {
      console.log(name);
      console.log(position);
      // console.log(ref_image.current.files[0]);
      console.log(ref_image_value);

      //AXIOS HERE
      const uploadTask = storage
        .ref(`fotos/${ref_image_value.name}`)
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
            .child(ref_image_value.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
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
    } else {
      console.log("Digite los campos correctamente");
      //MODAL HERE
      set_img_check_number(2);
      set_modal_content("Error: Digite los campos correctamente");
      set_is_modal_open(true);
    }
  };

  const closeModal = () => {
    set_is_modal_open(false);
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
                  onChange={(e) => set_name(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Cargo</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite el cargo de la persona"
                  ref={ref_position}
                  onChange={(e) => set_position(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Subir foto o tomar foto</Form.Label>
                <Form.Control type="file" ref={ref_image} />
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

      <Camera
        imageType={IMAGE_TYPES.PNG}
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
      />

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
    </div>
  );
};

export default Register;
