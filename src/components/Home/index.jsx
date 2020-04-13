import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'
import { db } from '../../firebase'

import 'bulma/css/bulma.css'

const Home = () => {

  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const user = firebase.auth().currentUser;

  const history = useHistory();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setEmail(user.email);
      setUserID(user.uid);
    }
  });

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  }


  const addInfo = () => {
    db.collection("testCollection").doc(userID).collection("Notes").doc().set({
      Title: "Note Title Testing!",
      Content: "This is new content test!"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }


  db.collection("testCollection").doc("3pOtrx0zlHZ13sx8dMxO").collection("Notes").get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      setNoteTitle(doc.Title);
      setNoteBody(doc.Content);
    });
  });


  return(
    <section className="section">
      <div className="container content">
        <p>Welcome to the home page</p>
        <ul>
          <li>Goog morning!: {email} </li>
          <li>User ID: {userID} </li>
          <li>Title: {noteTitle} </li>
          <li>Note: {noteBody} </li>
        </ul>
        <button className="button is-info" onClick={handleLogout}>Logout</button>
        <button className="button is-info" onClick={addInfo}>Add info</button>
      </div>
    </section>
  )
}

export default Home;