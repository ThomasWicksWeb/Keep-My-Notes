import React, { useState } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';
import { ErrorMessage } from '../Error';
import { SuccessMessage } from '../SuccessMessage';

import styles from './ChangeEmail.module.scss';

const ChangeEmail = () => {
  const [EmailField, SetEmailField] = useState('');
  const [error, setError] = useState({
    IsError: false,
    ErrorMessage: '',
  });

  const [success, setSuccess] = useState({
    IsSuccess: false,
    SuccessMessage: '',
  });

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
        console.log('Email updated!');
        setSuccess({
          IsSuccess: true,
          SuccessMessage: '',
        });
        CheckForError();
        SetEmailField('');
      })
      .catch(function (error) {
        setError({
          IsError: true,
          ErrorMessage: error.message,
        });
        CheckForError();
      });
  };

  const CheckForError = () => {
    if (error.IsError) {
      console.log('Error', error.IsError);
      return <ErrorMessage ErrorBody={error.ErrorMessage} />;
    }
  };

  const CheckForSuccess = () => {
    if (success.IsSuccess) {
      console.log('Success', success.IsSuccess);
      return (
        <SuccessMessage body="Account email has been successfully changed!" />
      );
    }
  };

  return (
    <section>
      <form>
        <div className={classnames('field', styles.field)}>
          {CheckForError()}
          {CheckForSuccess()}
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
