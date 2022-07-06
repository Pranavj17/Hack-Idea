import React from 'react';
import label from '../label';

const LoginComponent = ({
  onSubmit,
  error,
  updateError,
}) => {
  return (
    <div className="w-100 h-100 justify-content-center d-flex flex-wrap align-content-center">
      <div className="card text-center">
        <div className="card-header fs-1">
          {label.HACK_IDEAS}
        </div>
        <div className="card-body">
        <div class="mb-3">
          <label for="employeeId" class="form-label">{label.EMPLOYEE_ID}</label>
          <input
            type="number"
            class="form-control"
            id="employeeId"
            aria-describedby="emailHelp"
            onChange={() => updateError('')}
          />
        </div>
        {error && <div className="w-100 text-danger mb-1">{error}</div>}
          <button
            type='submit'
            className="btn btn-primary w-100"
            onClick={() => {
              if (document.getElementById('employeeId').value.length === 0) {
                updateError('Employee ID is required');
              } else {
                onSubmit(document.getElementById('employeeId').value);
              }
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  )
};

export default LoginComponent;
