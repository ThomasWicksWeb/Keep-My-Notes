import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
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

ExternalLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  href: PropTypes.string.isRequired,
};

export default ExternalLink;
