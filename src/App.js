import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './containers/login';
import Home from './containers/home';
import Error from './components/error';

const PrivateRoute = ({ children }) => {
  const employeeId = JSON.parse(window.sessionStorage.getItem('employeeId'));
  return employeeId ? children : <Navigate to="/" />;
};

export default () => (
  <BrowserRouter>
    <div className="h-100 w-100">
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  </BrowserRouter>
);

