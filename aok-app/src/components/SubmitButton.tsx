import React from 'react';

interface SubmitButtonProps {
  value: string,
  onSubmit: (e: React.MouseEvent) => void,
}

function SubmitButton({value, onSubmit}: SubmitButtonProps) {
  return (
    <input type="button" value={value} onClick={onSubmit} />
  );
}

export default SubmitButton;
