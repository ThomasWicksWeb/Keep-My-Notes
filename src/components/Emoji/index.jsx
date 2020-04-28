import React from 'react';
import PropTypes from 'prop-types';

const Emoji = ({ Emoji, Label }) => (
  <span role="img" aria-label={Label}>
    {Emoji}
  </span>
);

Emoji.propType = {
  Emoji: PropTypes.string.isRequired,
  Label: PropTypes.string.isRequired,
};

export default Emoji;
