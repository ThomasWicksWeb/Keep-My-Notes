import React from 'react';

const ErrorMessage = ({ ErrorBody }) => {
  return (
    <article className="notification is-danger">
      <strong>{ErrorBody} Please try again.</strong>
    </article>
  );
};

export default ErrorMessage;
