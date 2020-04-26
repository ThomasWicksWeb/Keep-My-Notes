import React from 'react';

const Emoji = ({ Emoji, Label }) => (
  <span role="img" aria-label={Label}>
    {Emoji}
  </span>
);

export default Emoji;
