import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'bulma/css/bulma.css'
import styles from './CreateAccount.module.scss'

const CreateAccount = () => {

    const [emailField, setEmail] = useState("");
    const [passwordField, setPassword] = useState("");
    const [passwordFieldConfirm, setPasswordConfirm] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirm = e => {
        setPasswordConfirm(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        console.log(emailField, passwordField);
    }


    return(
        <section className="section">
            <div className="container">

                <h3 className="has-text-weight-bold has-text-centered is-size-3">Create Account</h3>

                <form onSubmit={handleOnSubmit} className={styles.formContainer}>

                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" placeholder="Email" required value={emailField} onChange={handleEmail} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" required value={passwordField} onChange={handlePassword} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" required value={passwordFieldConfirm} onChange={handlePasswordConfirm} />
                        </div>
                    </div>

                    <button className="button is-info has-text-weight-bold" type="submit">Create Account</button>

                    <p className="has-text-centered">Already have an account?{' '}
                        <Link to="/login">Login</Link>
                    </p>

                    <p className="has-text-centered">Having trouble logging in?{' '}
                        <Link to="/resetpassword">Reset your password</Link>
                    </p>

                </form>

            </div>
        </section>
    )


}

export default CreateAccount;