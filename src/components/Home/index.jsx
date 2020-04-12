import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'

import 'bulma/css/bulma.css'
import { useState } from 'react'

const Home = () => {

  const [email, setEmail] = useState("");

  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  }

  const addInfo = () => {
      firebase.db.collection("testCollection").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });
  }

  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      const myUser = firebase.auth().currentUser;
      setEmail(myUser.email);
    }
  });

  return(
    <>
      <p>Hello</p>
      <ul>
        <li> {email} </li>
      </ul>
      <button className="button is-info" onClick={handleLogout}>Logout</button>
      <button className="button is-info" onClick={addInfo}>Add info</button>
    </>
  )
}

export default Home;