import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'

import 'bulma/css/bulma.css'

const Home = () => {

    // const check = () => { 
    //     firebase.auth().onAuthStateChanged(function(user) {
    //     if (user) {
    //       console.log("I'm logged in")
    //     } else {
    //       // No user is signed in.
    //       console.log("I'm NOT logged in")
    //     }
    //   });
    // }

    // useEffect(() => {
    //     check();
    // }, []);

    const history = useHistory();

    const handleLogout = () => {
      firebase.auth().signOut();
      history.push("/login");
    }

    return(
        <p>Hello
          <button className="button is-info" onClick={handleLogout}>Logout</button>
        </p>
    )
}

export default Home;