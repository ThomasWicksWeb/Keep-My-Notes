import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'
import { db } from '../../firebase'

import 'bulma/css/bulma.css'
import { useState } from 'react'

const Home = () => {

  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");

  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  }

  const addInfo = () => {
  
    const user = firebase.auth().currentUser;


    db.collection("testCollection").doc(user.uid).set({
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      const user = firebase.auth().currentUser;
      setEmail(user.email);
      setUserID(user.uid);
    }
  });

  return(
    <>
      <p>Hello</p>
      <ul>
        <li>Goog morning! {email} </li>
        <li>User ID {userID} </li>
      </ul>
      <button className="button is-info" onClick={handleLogout}>Logout</button>
      <button className="button is-info" onClick={addInfo}>Add info</button>
    </>
  )
}

export default Home;