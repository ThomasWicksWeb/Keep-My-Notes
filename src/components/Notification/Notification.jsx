import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './Notification.module.scss';

const Notification = ({ text }) => {
  return (
    <div className={classnames('notification is-info', styles.notification)}>
      {text}
    </div>
  );
};

Notification.propType = {
  text: PropTypes.string.isRequired,
};

export default Notification;
