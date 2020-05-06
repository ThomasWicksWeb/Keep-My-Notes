import React from 'react';
import PropTypes from 'prop-types'

const ErrorMessage = ({ ErrorBody }) => {
  return (
    <article className="notification is-danger">
      <strong>{ErrorBody} Please try again.</strong>
    </article>
  );
};

ErrorMessage.propType = {
  ErrorBody: PropTypes.string.isRequired,
};

export default ErrorMessage;
