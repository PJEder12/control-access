import React from "react";
import ReactDOM from "react-dom";
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import "./style/Camera.css";

const modalID = document.getElementById("modal");

const Camera_Component = (props) => {
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
    const simbolos = "0123456789ABCDEFGHIJKLMNOPQRST";
    var random_number = "";

    for (var i = 0; i < 30; i++) {
      random_number = random_number + simbolos[Math.floor(Math.random() * 16)];
    }

    const file = dataURLtoFile(dataUri, random_number);
    props.handle_take_photo(file);
    props.closeModal();
  };

  const handleClose = () => {
    props.closeModal();
  };

  if (!props.isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="camera_component">
      <div className="camera_component__container">
        <button
          onClick={handleClose}
          className="camera_component__close_button"
        >
          X
        </button>
        <h2>Tomar foto</h2>
        <p>
          Solo tienes que presionar el botón del medio para tomarte una foto.
        </p>
      </div>
      <div className="camera_take_photo_container">
        <Camera
          imageType={IMAGE_TYPES.PNG}
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri);
          }}
        />
      </div>
    </div>,
    modalID
  );
};

export default Camera_Component;
