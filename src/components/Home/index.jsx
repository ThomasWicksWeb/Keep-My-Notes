import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import firebase from 'firebase'
import { db } from '../../firebase'

import 'bulma/css/bulma.css'

const Home = ({myUserID}) => {

  // User specific data
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");
  
  // Array of all notes
  const [allNotes, setNotes] = useState([]);

  // Data for a new note to be added to Firebase
  const [newNote, setNewNote] = useState({
    Title: "",
    Content: "",
    LastEdit: new Date()
  });

  // Input fields
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");

  const history = useHistory();

  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     setEmail(user.email);
  //     setUserID(user.uid);
  //   }
  // });

  /////////////////////////////////////////////////////////////////
  
  useEffect( () => {
    firebase.auth().onAuthStateChanged(async user => {
      if(user) {
        const { uid } = user;
  
        // Getting the entire Notes collection for the user
        const querySnapshot = await db.collection('testCollection').doc(uid).collection('Notes').get();

        // Getting each individual note
        const storedNotes = await Promise.all(querySnapshot.docs.map(async doc => await doc.data()));

        setNotes(storedNotes); // Array state containing all notes
        setEmail(user.email); // Sets user email
        setUserID(user.uid); // Sets user's ID
      }
      
    })
  }, []);
  
  // If the user's ID hasn't loaded, show that it's loading
  if(!userID) {
    return <h1>loading...</h1>;
  }

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
        setNewNote({
          Title: inputTitle,
          Content: inputBody,
          LastEdit: new Date()
        })

        setNotes(allNotes, newNote);

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
    db.collection("testCollection").doc(myUserID).collection("Notes").get().then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        let newArr = [...allNotes, doc.data()];
        allNotes(newArr)
        console.log(doc.data());
        console.log(newArr);
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

        <hr />

        <div className="content">
          <h1 className="is-size-3 has-text-weight-bold">Notes</h1>
          <ul>
            {allNotes.map(item => {
              return(
                <li key={item.Title}>
                  <p className="has-text-weight-bold is-size-4">{item.Title}</p>
                  <p className="is-size-6">{item.Content}</p>
                </li>
              )
            })}
          </ul>
        </div>



      </div>
    </section>
  )
}

export default Home;