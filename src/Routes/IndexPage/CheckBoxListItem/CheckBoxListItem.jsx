import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types'
import styles from './CheckBoxListItem.module.scss';

const CheckBoxListItem = ({ img, imgAlt, title, subtitle }) => {
  return (
    <li className={classnames('has-text-centered', styles.listItem)}>
      <img src={img} alt={imgAlt} className={styles.GridListImage} />
      <h3 className='is-size-4'>{title}</h3>
      <h4 className='is-size-6 has-text-grey'>{subtitle}</h4>
    </li>
  );
};

CheckBoxListItem.propType = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default CheckBoxListItem;
