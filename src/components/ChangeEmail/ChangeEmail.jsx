import React, { useState } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';

import { toast, ToastContainer } from 'react-toastify';

import styles from './ChangeEmail.module.scss';

const ChangeEmail = () => {
  const [EmailField, SetEmailField] = useState('');

  var user = firebase.auth().currentUser;

  if (!user) {
    return <></>;
  }

  const handleOnChange = (e) => {
    SetEmailField(e.target.value);
  };

  const ChangeEmail = (e) => {
    e.preventDefault();

    user
      .updateEmail(EmailField)
      .then(function () {
        toast.success('Email successfully updated', {
          position: 'top-center',
        });
      })
      .catch(function (error) {
        toast.error(error.message, {
          position: 'top-center',
        });
      });
  };

  return (
    <section>
      <form>
        <div className={classnames('field', styles.field)}>
          <ToastContainer />
          <div className="control">
            <input
              className="input"
              type="text"
              value={EmailField}
              onChange={handleOnChange}
              placeholder="New email"
            />
          </div>
        </div>
        <button className="button is-link" onClick={ChangeEmail}>
          Change Email
        </button>
      </form>
    </section>
  );
};

export default ChangeEmail;
