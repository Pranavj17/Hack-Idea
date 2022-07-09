import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/login';
import label from '../label';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = (data) => {
    window.sessionStorage.setItem('employeeId', data);
    navigate("home", { replace: true });
  };

  return (
    <div className="w-100 h-100 d-flex flex-wrap align-items-center">
      <div className="fs-50 col-12 col-md-4 fw-bold px-2 color-yellow text-center">{label.HACK_IDEAS} <i className="fas fa-lightbulb lightBulb px-2" /></div>
      <div className="col-12 col-md-8 h-100">
        <LoginComponent
          onSubmit={onSubmit}
          updateError={(e) => setError(e)}
          error={error}
        />
      </div>
    </div>
  );
};

export default Login;