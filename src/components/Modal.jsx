import React from "react";
import './modal.css';

const Modal = ({
  children,
  title,
}) => {
  return (
    <div className="modalWrapper">
      <div className="w-100 h-10 fs-2 text-center text-black fw-bold">{title}</div>
      <div className="w-100 h-90 d-flex flex-wrap">
        {children}
      </div>
    </div>
  );
};

export default Modal;