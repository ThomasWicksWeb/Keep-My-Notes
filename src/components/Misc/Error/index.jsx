import React from 'react';

const ErrorMessage = ({ ErrorBody }) => {
  return (
    <article class="notification is-danger">
      <strong>{ErrorBody}. Please try again.</strong>
    </article>
  );
};

export default ErrorMessage;
