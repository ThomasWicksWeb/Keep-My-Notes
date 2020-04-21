import React from 'react';
import classnames from 'classnames';
import styles from './ExternalLink.module.scss';

const ExternalLink = ({ text, icon, href }) => {
  return (
    <a
      href={href}
      className={classnames(
        'helpingMarginLR noWrap is-size-6',
        styles.textHighlight,
        styles.hvrSweepToRight
      )}
      target="_blank"
      rel="noopener noreferrer"
    >
      <strong>
        {text} <i className={icon}></i>
      </strong>
    </a>
  );
};

export default ExternalLink;
