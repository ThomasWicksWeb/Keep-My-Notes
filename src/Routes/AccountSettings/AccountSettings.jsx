import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import 'bulma/css/bulma.css';
import './Account.scss';
import { ChangeEmail } from '../../components/ChangeEmail';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Account = () => {

  // User object from FireStore
  const { userState } = useContext(AuthContext)

  // If the user's ID hasn't loaded, show that the page is loading
  if (!userState) {
    return <></>;
  }

  return (
    <main className="section">
      <div className="section">
        <h1 className="title account-section">Account Info</h1>
        <ul>
          <li className="settingsGroup has-text-weight-bold">
            <p className="is-size-5">
              Email:{' '}
              <span className="is-size-6 has-text-weight-normal">
                {userState.email}
              </span>
            </p>
          </li>
          <li className="settingsGroup">
            <p className="is-size-5">
              User ID: <span className="is-size-6">{userState.uid}</span>
            </p>
          </li>
        </ul>

        <h1 className="title account-section AccountHeader">Actions</h1>
        <ul>
          <li className="has-text-weight-bold">
            <Link to="resetpassword" className="button is-size-6 is-link">
              Reset Password
            </Link>
          </li>
          <li>
            <h1 className="title account-section AccountHeader">Change Email</h1>
            <ChangeEmail />
          </li>
        </ul>
      </div>
      <Helmet>
        <title>Account | Keep My Notes</title>
        <meta
          name="description"
          content="Account information and settings"
        />
      </Helmet>
    </main>
  );
};

export default Account;
