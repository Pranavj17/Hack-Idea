import React from "react";
import label from "../label";
import './modal.css';

const Modal = ({
  children,
  title,
  onClose,
  onSave
}) => {
  console.log('aaa');
  return (
    <div className="modalWrapper">
      <div className="w-100 h-10 fs-3 text-center">{title}</div>
      <div className="w-100 h-80">
        {children}
      </div>
      <div className="w-100 row mx-0 h-10 align-items-center">
        <div className="w-50 px-2">
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => onClose()}
          >
            {label.CLOSE}
          </button>
        </div>
        <div className="w-50 px-2">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => onSave()}
          >
            {label.SAVE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;