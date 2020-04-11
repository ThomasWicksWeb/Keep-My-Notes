import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import CreateAccount from '../CreateAccount'
import ResetPassword from '../ResetPassword'

import 'bulma/css/bulma.css'
import styles from './Login.module.scss'

const StandardLogin = () => {

    const [emailField, setEmail] = useState("");
    const [passwordField, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        console.log(emailField, passwordField);
    }


    return(
        <section className="section">
            <div className="container">

                <h3 className="has-text-weight-bold has-text-centered is-size-3">Login</h3>
                <h3 className="has-text-weight-bold has-text-centered is-size-4">with Username or Email</h3>

                <form onSubmit={handleOnSubmit} className={styles.formContainer}>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="Email" required onChange={handleEmail} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" required onChange={handlePassword} />
                        </div>
                    </div>
                    <button className="button is-info has-text-weight-bold" type="submit">Login</button>

                    <p className="has-text-centered">Don't have an account?{' '}
                        <Link to="/createaccount">Create one here</Link>
                    </p>
                    
                    <p className="has-text-centered">Having trouble logging in?{' '}
                        <Link to="/resetpassword">Reset your password</Link>
                    </p>
                    {/* <p>Reset password <Link to="/resetpassword">Here</Link></p> */}

                    
                    {/* <p className="has-text-centered">Having trouble logging in? <a href="#"> Reset your password</a></p> */}
                </form>

            </div>
        </section>
    )


}

export default StandardLogin;