import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import firebase from 'firebase';
import classnames from 'classnames';
import ErrorMessage from '../../components/Error';

import 'bulma/css/bulma.css';
import styles from './Login.module.scss';

const StandardLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    IsError: false,
    ErrorMessage: '',
  });

  const history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (user) {
        // user signed in
        history.push('/notes');
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
      return <ErrorMessage ErrorBody={error.ErrorMessage} />;
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className={classnames('section', styles.LoginBackground)}>
      <div className="container">
        {CheckForError()}

        <h3 className="has-text-weight-bold has-text-centered is-size-3">
          Login
        </h3>
        <h3 className="has-text-weight-bold has-text-centered is-size-4">
          with Username or Email
        </h3>

        <form onSubmit={handleOnSubmit} className={styles.formContainer}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleEmail}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={handlePassword}
              />
            </div>
          </div>
          <button className="button is-info has-text-weight-bold" type="submit">
            Login
          </button>

          <hr />

          <p className="has-text-centered">
            Don't have an account? <Link to="/createaccount">Create one</Link>
          </p>

          <p className="has-text-centered">
            Having trouble logging in?{' '}
            <Link to="/resetpassword">Reset your password</Link>
          </p>
        </form>
      </div>
      <Helmet>
        <title>Login | Keep My Notes</title>
      </Helmet>
    </section>
  );
};

export default StandardLogin;
