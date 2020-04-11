import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StandardLogin from './StandardLogin'
import ResetPassword from './ResetPassword'
import CreateAccount from './CreateAccount'


const Login = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={StandardLogin} />
                <Route exact path="/login" component={StandardLogin} />
                <Route exact path="/resetpassword" component={ResetPassword} />
                <Route exact path="/createaccount" component={CreateAccount} />
            </Switch>
        </Router>
    )

}


export default Login;