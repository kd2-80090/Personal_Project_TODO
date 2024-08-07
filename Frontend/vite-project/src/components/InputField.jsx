import React from 'react';

const InputField = ({ type, label, value, onChange }) => {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} value={value} onChange={onChange} required />
    </div>
  );
};

export default InputField;
