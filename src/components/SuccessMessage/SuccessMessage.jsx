import React from 'react';
import PropTypes from 'prop-types';

const SuccessMessage = ({ body }) => {
  return (
    <article className="notification is-success">
      <strong>{body}</strong>
    </article>
  );
};

SuccessMessage.propType = {
  body: PropTypes.string.isRequired,
};

export default SuccessMessage;
