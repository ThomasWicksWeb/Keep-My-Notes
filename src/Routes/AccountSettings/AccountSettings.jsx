import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import firebase from 'firebase';
import 'bulma/css/bulma.css';
import './Account.scss';

const Account = () => {
  // User specific data
  const [user, setUser] = useState('');
  // const [DarkModeCheck, setDarkModeCheck] = useState(false);

  // const DarkModeCheckBox = React.createRef();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // If the user's ID hasn't loaded, show that the page is loading
  if (!user) {
    return <></>;
  }

  // const x = localStorage.getItem('DarkMode');
  //   if (x) {
  //     setDarkModeCheck(true);
  //     useRef.DarkModeCheckBox.checked = true;
  //     console.log("Setting dark mode from settings page useEffect:", x)
  //   } else {
  //     setDarkModeCheck(false);
  //     useRef.DarkModeCheckBox.checked = false;
  //     console.log("Setting dark mode from settings page useEffect:", x)
  //   }

  // const DarkModeOnChange = (e) => {
  //   if (e.target.checked) {
  //     localStorage.setItem('DarkMode', "true");
  //     setDarkModeCheck(true);
  //     console.log("On change:", e.target.checked)
  //   } else {
  //     localStorage.setItem('DarkMode', "false");
  //     setDarkModeCheck(false);
  //     console.log("On change:", e.target.checked);
  //   }
  // };

  return (
    <main className="section">
      <div className="section">
        <h1 className="title account-section">Account Info</h1>
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

        <h1 className="title account-section">Actions</h1>
        <ul>
          <li className="has-text-weight-bold">
            <Link to="resetpassword" className="button is-size-6 is-link">
              Reset Password
            </Link>
          </li>
        </ul>
      </div>
      <Helmet>
        <title>Account | Keep My Notes</title>
      </Helmet>
    </main>
  );
};

export default Account;
