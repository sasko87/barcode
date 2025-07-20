import React from "react";

const Input = ({ label, id, ...props }) => {
  return (
    <>
      <div className="input-container">
        <label htmlFor={id} {...props}>
          {label}
        </label>
        <input id={id} {...props} />
      </div>
    </>
  );
};

export default Input;
