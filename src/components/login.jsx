import React from 'react';
import label from '../label';

const LoginComponent = ({
  onSubmit,
  error,
  updateError,
}) => {
  return (
    <div className="w-100 h-100 justify-content-center text-center fs-4 d-flex flex-wrap align-content-center">
      <div className="card">
        <div className="card-body d-flex flex-wrap">
          <div className="w-100 mb-3">
            <label className="form-label">{label.EMPLOYEE_ID}</label>
            <input
              type="number"
              className="form-control"
              data-testid="employeeId"
              placeholder='Enter Employee Id'
              id="employeeId"
              aria-describedby="emailHelp"
              onFocus={() => updateError('')}
            />
          </div>
          <div className="mt-auto align-self-end w-100">
          {error && <div className="text-center w-100 fs-6 text-danger mb-1">{error}</div>}
            <button
              type='submit'
              className="btn btn-success w-100"
              onClick={() => {
                if (document.getElementById('employeeId').value.length === 0) {
                  updateError('Employee ID is required');
                } else {
                  onSubmit(document.getElementById('employeeId').value);
                }
              }}
            >
              {label.LOGIN}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

// LoginComponent.propTypes = {
//   onSubmit: propTypes.func.isRequired,
//   error: propTypes.func.isRequired,
//   updateError: propTypes.func.isRequired
// };

export default LoginComponent;
