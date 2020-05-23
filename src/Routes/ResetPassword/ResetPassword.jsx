import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'firebase';
import { auth } from '../../firebase';

import { toast, ToastContainer } from 'react-toastify';

import 'bulma/css/bulma.css';
import styles from './ResetPassword.module.scss';

const ResetPassword = () => {
  const [emailField, setEmail] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    auth
      .sendPasswordResetEmail(emailField)
      .then(function () {
        toast.success("Please check your email for further instructions on resetting your password.", {
          position: 'top-center',
        });
        setEmail('');
      })
      .catch(function (error) {
        toast.error(error.message, {
          position: 'top-center',
        });
      });
  };

  return (
    <section className="section">
      <div className="container">
        <ToastContainer />

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
      <Helmet>
        <title>Reset Password | Keep My Notes</title>
        <meta
          name="description"
          content="Reset your Keep My Notes password"
        />
      </Helmet>
    </section>
  );
};

export default ResetPassword;
