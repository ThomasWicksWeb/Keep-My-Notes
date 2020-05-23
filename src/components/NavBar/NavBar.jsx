import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

// Toast notifications
import { toast, ToastContainer } from 'react-toastify';

// Import Auth Context
import { AuthContext } from '../../contexts/AuthContext';

import firebase from 'firebase';
import './NavBar.scss';

const NavBar = () => {
  const { userState } = useContext(AuthContext);

  const history = useHistory();

  // Handles user logout
  const handleLogout = () => {
    firebase.auth().signOut();
    toast.success('Successfully logged out', {
      position: 'top-center',
    });
    history.push('/login');
  };

  const AuthDependantButtons = () => {
    if (!userState) {
      return (
        <div className="buttons">
          <Link className="button is-info" to="/createaccount">
            <strong>Sign Up</strong>
          </Link>
          <Link className="button is-light" to="/login">
            <strong>Login</strong>
          </Link>
        </div>
      );
    } else {
      return (
        <>
          <Link to="/notes" className="navbar-item">
            <strong>My Notes</strong>
          </Link>
          <Link to="/account" className="navbar-item">
            <strong>Account</strong>
          </Link>
          <button className="button is-info" onClick={handleLogout}>
            <strong>Logout</strong>
          </button>
        </>
      );
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <ToastContainer />
      <div className="navbar-brand">
        <Link to="/" className="navbar-item is-size-3 ScriptFont">
          Keep My Notes
        </Link>

        <button
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
          <Link to="/about" className="navbar-item">
            <strong>About</strong>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">{AuthDependantButtons()}</div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
