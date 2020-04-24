import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'firebase'
import {auth} from '../../firebase'

import 'bulma/css/bulma.css';
import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
  const [emailField, setEmail] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

//   var emailAddress = 'stringemail';

//   auth
//     .sendPasswordResetEmail(emailAddress)
//     .then(function () {
//       // Email sent.
//     })
//     .catch(function (error) {
//       // An error happened.
//     });

  return (
    <section className="section">
      <div className="container">
        <h3 className="has-text-weight-bold has-text-centered is-size-3">
          Reset your Password
        </h3>

        <form onSubmit={handleOnSubmit} className={styles.formContainer}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Enter your Email"
                required
                value={emailField}
                onChange={handleEmail}
              />
            </div>
          </div>

          <button className="button is-info has-text-weight-bold" type="submit">
            Reset Password
          </button>

          <p className="has-text-centered">
            Rememered your password? <Link to="/login">Login</Link>
          </p>

          <p className="has-text-centered">
            Don't have an account? <Link to="/createaccount">Create one</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
