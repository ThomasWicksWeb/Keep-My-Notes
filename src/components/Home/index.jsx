import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'
import { db } from '../../firebase'

import 'bulma/css/bulma.css'

const Home = ({myUserID}) => {

  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  
  const [noteTitles, setTitles] = useState([]);


  // Input fields
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");

  const history = useHistory();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setEmail(user.email);
      setUserID(user.uid);
    }
  });

  /////////////////////////////////////////////////////////////////
  
  // while (firebase.auth().currentUser === null) {
  //   console.log("Loading...");
  // }

  // if (firebase.auth().currentUser !== null) {
  //   console.log("user id: " + firebase.auth().currentUser.uid);
  //   setUserID(firebase.auth().currentUser.uid);
  // }


  // Calls firebase for data on apge load -- currently crashes app since the user ID isn't loaded from Firebase yet
  db.collection("testCollection").doc(myUserID).collection("Notes").get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      setTitles(...noteTitles, doc.data().Title)
    });
  });

  /////////////////////////////////////////////////////////////////


  // Handles input field for note title
  const handleTitleChange = (e) => {
    setInputTitle(e.target.value)
  }

  // Handles input field for new note body
  const handleBodyChange = (e) => {
    setInputBody(e.target.value)
  }

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  }

  // Adding new note to FireBase
  const AddNewNote = (e) => {
    e.preventDefault();

    db.collection("testCollection").doc(userID).collection("Notes").doc().set({
      Title: inputTitle,
      Content: inputBody,
      LastEdit: new Date()
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  

 
  // Test button to push static info to FireBase
  const addInfo = () => {
    db.collection("testCollection").doc(userID).collection("Notes").doc().set({
      Title: "Hello World",
      Content: "This is my first firebase applicati"
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  
  // Test button to call into from FireBase
  const callInfo = () => {
    // if (firebase.auth().currentUser !== null) {
    //   console.log("user id: " + firebase.auth().currentUser.uid);
    //   setUserID(firebase.auth().currentUser.uid);
    // }

    db.collection("testCollection").doc(myUserID).collection("Notes").get().then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        setTitles(...noteTitles, doc.data().Title)
      });
    });
  }

  return(
    <section className="section">
      <div className="container content">
        <p>Welcome to the home page</p>
        <ul>
          <li>Goog morning!: {email} </li>
          <li>User ID: {userID} </li>
        </ul>
        <button className="button is-info" onClick={handleLogout}>Logout</button>
        <button className="button is-info" onClick={addInfo}>Add info</button>
        <button className="button is-info" onClick={callInfo}>Call info</button>

        <form onSubmit={AddNewNote}>

          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input className="input" type="text" placeholder="Title" onChange={handleTitleChange} value={inputTitle} />
            </div>
          </div>

          <div className="field">
            <label className="label">Note</label>
            <div className="control">
              <textarea className="textarea" placeholder="Add your note" onChange={handleBodyChange} value={inputBody}></textarea>
            </div>
          </div>

          <button type="submit" className="button is-size-5 is-info">Add Note to Firestore</button>
        </form>

        <div className="content">
          <ul>
            {noteTitles.map(e => {
              return <li>{e}</li>
            })}
          </ul>
        </div>



      </div>
    </section>
  )
}

export default Home;