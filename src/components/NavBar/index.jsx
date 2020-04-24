import React, { useEffect, useState } from 'react';
import { Router, Link, useHistory } from 'react-router-dom';

import firebase from 'firebase';

const NavBar = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    // setUser will take the whole user object. not point in storing mail and id separately :)
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    console.log("Nav bar render")
  }, []);

  const history = useHistory();

  // Handles user logout
  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/login');
  };

  const buttons = () => {
    if (!user) {
      return (
        <div className="buttons">
          <Link className="button is-info" to="/createaccount"><strong>Sign Up</strong></Link>
          <Link className="button is-light" to="/login"><strong>Login</strong></Link>
        </div>
      );
    } else {
      return (
        <button className="button is-info" onClick={handleLogout}>
          Logout
        </button>
      );
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="logo"
          />
        </a>

        <button
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {/* <Router>
            <p className="navbar-item">
              <Link to="/notes">Notes</Link>
            </p>
          </Router> */}

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Jobs</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {/* <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">Log in</a>
            </div> */}
            {buttons()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
