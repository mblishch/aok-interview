import React from 'react';
import './ErrorMessage.css';

interface ErrorProps {
  error: string,
  onClose: (e: React.MouseEvent) => void,
}

function ErrorMessage({error, onClose}: ErrorProps) {
  return (
    <div className="ErrorMessage">
      <div className="ErrorMessage-message">{error}</div>
      <div className="ErrorMessage-close" onClick={onClose}>&times;</div>
    </div>
  );
}

export default ErrorMessage;
