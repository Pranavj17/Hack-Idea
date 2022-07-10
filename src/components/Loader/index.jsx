import React from 'react';
import './loader.css';

const Loader = () => {
  return (
    <div className="mx-sm-0 transparent">
      <div className={`row w-100 h-100 mx-0 justify-content-center align-items-center`}>
        <div className="imgSpin" />
      </div>
    </div>
  );
};
export default Loader;
