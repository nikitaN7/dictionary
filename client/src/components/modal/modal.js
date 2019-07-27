import React from 'react';
import ReactDOM from "react-dom";
import ModalInner from './modal-inner';

const Modal = (props) => {
  return ReactDOM
  .createPortal(
    <ModalInner { ...props } />,
    document.querySelector("#modal")
  );
}

export default Modal;