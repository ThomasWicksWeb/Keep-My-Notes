import React from 'react';

const ErrorMessage = ({ body }) => {
  return (
    <article className="notification is-success">
      <strong>{body}</strong>
    </article>
  );
};

export default ErrorMessage;
