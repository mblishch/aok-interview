import React from 'react';
import './SubmitButton.css';

interface SubmitButtonProps {
  value: string,
  onSubmit: (e: React.MouseEvent) => void,
}

function SubmitButton({value, onSubmit}: SubmitButtonProps) {
  return (
    <div className="SubmitButton">
      <input type="submit" value={value} onClick={onSubmit} />
    </div>
  );
}

export default SubmitButton;
