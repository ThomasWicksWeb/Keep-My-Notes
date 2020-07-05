import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';

import AuthContextProvider from './contexts/AuthContext';
import ThemeContextProvider from './contexts/ThemeContext';

// Styles
import './BulmaFixes.scss';

// Other components
import { NavBar } from './components/NavBar';
import { AppFooter } from './components/Footer';

// Logged in content
import { Notes } from './Routes/Notes';
import { AccountSettings } from './Routes/AccountSettings';

// Logged out content
import { IndexPage } from './Routes/IndexPage';
import { About } from './Routes/About';
import { StandardLogin } from './Routes/StandardLogin';
import { CreateAccount } from './Routes/CreateAccount';
import { ResetPassword } from './Routes/ResetPassword';

function App() {
  return (
    <>
      <AuthContextProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/account" component={AccountSettings} />
              <Route exact path="/notes" component={Notes} />
              <Route exact path="/home" component={IndexPage} />
              <Route exact path="/about" component={About} />
              <Route exact path="/login" component={StandardLogin} />
              <Route exact path="/resetpassword" component={ResetPassword} />
              <Route exact path="/createaccount" component={CreateAccount} />
            </Switch>
          </BrowserRouter>
        </ThemeContextProvider>
      </AuthContextProvider>
      <AppFooter />
    </>
  );
}

export default App;
