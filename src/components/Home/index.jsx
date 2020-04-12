import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'
import { db } from '../../firebase'

import 'bulma/css/bulma.css'
import { useState } from 'react'

const Home = () => {

  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [country, setCountry] = useState("");

  const user = firebase.auth().currentUser;

  const history = useHistory();

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  }


  const addInfo = () => {
    db.collection("testCollection").doc(user.uid).set({
      name: "Thomas Wicks",
      state: "NY",
      country: "USA"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  db.collection("testCollection").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(doc.data().country);
    });
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setEmail(user.email);
      setUserID(user.uid);
    }
  });

  return(
    <>
      <p>Welcome to the home page</p>
      <ul>
        <li>Goog morning! {email} </li>
        <li>User ID {userID} </li>
        <li>country {country} </li>
      </ul>
      <button className="button is-info" onClick={handleLogout}>Logout</button>
      <button className="button is-info" onClick={addInfo}>Add info</button>
    </>
  )
}

export default Home;