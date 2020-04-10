import React, { useState } from 'react';

import 'bulma/css/bulma.css'
import styles from './Login.module.scss'

const Login = () => {

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
                            <input className="input" type="text" placeholder="Email" onChange={handleEmail} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input className="input" type="password" placeholder="Password" onChange={handlePassword} />
                        </div>
                    </div>
                    <button className="button is-info has-text-weight-bold" type="submit">Login</button>
                </form>

            </div>
        </section>
    )


}

export default Login;