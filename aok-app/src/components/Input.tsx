import React from 'react';
import './Input.css';

interface InputProps {
  label: string,
  name: string,
  onChange: (name: string, value: string) => void,
}

function Input({label, name, onChange}: InputProps) {
  return (
    <div className="Input">
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} onChange={(e) => {
        const { value } = e.target;
        onChange(name, value);
      }} />
    </div>
  );
}

export default Input;
