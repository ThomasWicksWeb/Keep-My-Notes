import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import './firebase';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

// Styles
import './BulmaFixes.scss';

// Other components
import { NavBar } from './components/NavBar';
import { AppFooter } from './components/Footer';

// Logged in content
import { Home } from './Routes/Home';
import { AccountSettings } from './Routes/AccountSettings';

// Logged out content
import { IndexPage } from './Routes/IndexPage';
import { About } from './Routes/About';
import { StandardLogin } from './Routes/StandardLogin';
import { CreateAccount } from './Routes/CreateAccount';
import { ResetPassword } from './Routes/ResetPassword';

function App() {
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
          <Route exact path="/about" component={About} />
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
