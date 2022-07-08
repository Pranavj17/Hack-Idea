import React from "react";
import './modal.css';

const Modal = ({
  children,
  title,
}) => {
  return (
    <div className="modalWrapper">
      <div className="w-100 h-10 fs-3 text-center">{title}</div>
      <div className="w-100 h-90">
        {children}
      </div>
    </div>
  );
};

export default Modal;