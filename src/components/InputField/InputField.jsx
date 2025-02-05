import React from "react";
import "./InputField.css";

export const InputField = ({
  label,
  name,
  register,
  errors,
  type = "text",
}) => {
  const error = errors[name];

  return (
    <div className={`input-field ${error ? "error" : ""}`}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        {...register(name, { required: `${label} is required` })}
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
