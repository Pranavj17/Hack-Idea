import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginComponent from '../components/login';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const onSubmit = (data) => {
    window.sessionStorage.setItem('employeeId', data);
    navigate("home", { replace: true });
  };

  return (
    <LoginComponent
      onSubmit={onSubmit}
      updateError={(e) => setError(e)}
      error={error}
    />
  );
};

export default Login;