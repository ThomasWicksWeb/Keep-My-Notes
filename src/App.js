import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './firebase';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Other components
import NavBar from './components/NavBar';
import AppFooter from './components/Footer';

// Logged in content
import Home from './components/Home';
import AccountSettings from './components/AccountSettings';

// Logged out content
import IndexPage from './components/index';
import StandardLogin from './components/StandardLogin';
import CreateAccount from './components/CreateAccount';
import ResetPassword from './components/ResetPassword';

function App() {
  // useEffect(() => {
  //   const IsDarkModeActive = localStorage.getItem('DarkMode');
  //   if (IsDarkModeActive) {
  //     return (
  //       <Helmet>
  //         <link src="./darkmode.scss" />
  //       </Helmet>
  //     );
  //   }
  // }, []);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("I'm logged in");
    } else {
      console.log("I'm NOT logged in");
    }
  });

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/home" component={IndexPage} />
          <Route exact path="/account" component={AccountSettings} />
          <Route exact path="/notes" component={Home} />
          <Route exact path="/login" component={StandardLogin} />
          <Route exact path="/resetpassword" component={ResetPassword} />
          <Route exact path="/createaccount" component={CreateAccount} />
        </Switch>
      </BrowserRouter>
      <AppFooter />
    </>
  );
}

export default App;
