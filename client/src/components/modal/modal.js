import React from 'react';
import ReactDOM from "react-dom";
import ModalInner from './modal-inner';

const Modal = (props) => {
  return ReactDOM
  .createPortal(
    props.isOpen
      ? <ModalInner { ...props } />
      : null,
    document.querySelector("#modal-root")
  );
}

export default Modal;