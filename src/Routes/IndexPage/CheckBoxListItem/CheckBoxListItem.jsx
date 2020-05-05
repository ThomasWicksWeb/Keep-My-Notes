import React from 'react';
import classnames from 'classnames';
import styles from './CheckBoxListItem.module.scss';

const CheckBoxListItem = ({ icon, title, subtitle }) => {
  return (
    <li className={classnames('has-text-centered', styles.listItem)}>
      <i
        className={classnames('is-size-3', icon, styles.icon)}
      ></i>
      <h3 className={classnames('is-size-4', styles.iconTitle)}>{title}</h3>
      <h4 className={classnames('is-size-6 has-text-grey', styles.iconSubtitle)}>{subtitle}</h4>
    </li>
  );
};

export default CheckBoxListItem;
