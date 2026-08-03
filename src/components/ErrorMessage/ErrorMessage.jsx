import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: '#fdecea',
        color: '#b71c1c',
        padding: '10px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        margin: '6px auto',
        border: '1px solid #f5c6cb',
        width: '95%',
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;