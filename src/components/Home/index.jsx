import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'
import { db } from '../../firebase'

import 'bulma/css/bulma.css'

const Home = () => {

  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  const [noteTitle, setNoteTitle] = useState([]);
  const [noteBody, setNoteBody] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  const history = useHistory();

  // const uid = firebase.auth().currentUser;
  // console.log(firebase.auth().currentUser);
  // console.log(firebase.auth().currentUser.uid);
  // if (firebase.auth().currentUser !== null) {
  //       console.log("user id: " + firebase.auth().currentUser.uid);
  //       setUserID(firebase.auth().currentUser.uid);
  // }


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

  

const callInfo = () => {

  if (firebase.auth().currentUser !== null) {
    console.log("user id: " + firebase.auth().currentUser.uid);
    setUserID(firebase.auth().currentUser.uid);
  }

  console.log("USER ID HERE:", userID)

  // var x = "WrgI3qjBF8WqnuyzAmHVsCB1prt1";

  db.collection("testCollection").doc(userID).collection("Notes").get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      // setNoteTitle(...noteTitle, doc.Title);
      // setNoteBody(...noteBody, doc.Content);
      setNoteTitle(doc.data().Title);
      setNoteBody(doc.data().Content);
      // console.log('-------------------------')
      // console.log(doc.data().Title)
      // console.log(doc.data().Content)
      // console.log('-------------------------')

      setAllNotes(...allNotes, doc.data().Title)
      console.log("NOTES:", allNotes)

    });
  });
}

  // console.log("USER ID HERE:", userID)

  // db.collection("testCollection").doc(uid).collection("Notes").get().then((querySnapshot) => {
  //   querySnapshot.docs.forEach((doc) => {
  //     // setNoteTitle(...noteTitle, doc.Title);
  //     // setNoteBody(...noteBody, doc.Content);
  //     setNoteTitle(doc.data().Title);
  //     setNoteBody(doc.data().Content);
  //     console.log('-------------------------')
  //     console.log(doc.data())
  //     // console.log(doc)
  //     // console.log(doc)
  //     console.log('-------------------------')
  //   });
  // });


  return(
    <section className="section">
      <div className="container content">
        <p>Welcome to the home page</p>
        <ul>
          <li>Goog morning!: {email} </li>
          <li>User ID: {userID} </li>
          <li>Title: {noteTitle} </li>
          <li>Note: {noteBody} </li>
          <li>All Notes:
            { allNotes }
          </li>
        </ul>
        <button className="button is-info" onClick={handleLogout}>Logout</button>
        <button className="button is-info" onClick={addInfo}>Add info</button>
        <button className="button is-info" onClick={callInfo}>Call info</button>
      </div>
    </section>
  )
}

export default Home;