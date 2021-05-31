import React from "react";
import ReactDOM from "react-dom";

import "./style/Modal.css";

const modalID = document.getElementById("modal");

const Modal = (props) => {
  const handleClose = () => {
    props.closeModal();
  };
  if (!props.isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="modal_component">
      <div className="modal_component__container">
        <button onClick={handleClose} className="modal_component__close_button">
          X
        </button>
        {props.children}
      </div>
    </div>,
    modalID
  );
};

export default Modal;
