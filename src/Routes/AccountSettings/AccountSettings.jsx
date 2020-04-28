import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import firebase from 'firebase';
import 'bulma/css/bulma.css';
import './Account.scss';

const Account = () => {
  // User specific data
  const [user, setUser] = useState('');

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // If the user's ID hasn't loaded, show that the page is loading
  if (!user) {
    return <></>;
  }

  return (
    <main className="section">
      <div className="section">
        <h1 className="title">Account Info</h1>
        <ul>
          <li className="settingsGroup has-text-weight-bold">
            <p className="is-size-5">
              Email:{' '}
              <span className="is-size-6 has-text-weight-normal">
                {user.email}
              </span>
            </p>
          </li>
          <li className="settingsGroup">
            <p className="is-size-5">
              User ID: <span className="is-size-6">{user.uid}</span>
            </p>
          </li>
        </ul>

        {/* <h1 className="title">Settings</h1>
        <ul>
          <li className="settingsGroup has-text-weight-bold">
            <label className="checkbox is-size-5">
              Dark Mode:
              <input
                type="checkbox"
                // value={DarkMode}
                onChange={DarkModeOnChange}
                checked={DarkMode}
              />
            </label>
          </li>
          <li className="settingsGroup">
            <p className="is-size-5">
              User ID: <span className="is-size-6">{user.uid}</span>
            </p>
          </li>
        </ul> */}
      </div>
      <Helmet>
        <title>Account | Keep My Notes</title>
      </Helmet>
    </main>
  );
};

export default Account;
