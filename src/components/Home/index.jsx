import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import firebase from 'firebase';
import { db } from '../../firebase';

import Note from './Note';
import 'bulma/css/bulma.css';
// import '../../darkmode.scss'

const Home = () => {
  // User specific data
  const [user, setUser] = useState('');

  // Array of all notes
  const [allNotes, setNotes] = useState([]);

  // Data for a new note to be added to Firebase
  const [newNote, setNewNote] = useState({
    Title: '',
    Content: '',
    LastEdit: new Date(),
    DocumentID: 0,
  });

  // Input fields
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  const history = useHistory();

  /////////////////////////////////////////////////////////////////

  useEffect(() => {
    // setUser will take the whole user object. not point in storing mail and id separately :)
    firebase.auth().onAuthStateChanged((user) => {
      // const { uid } = user;
      console.log('check rerender from user auth() useEffect');
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getCollectionData(user.uid).then(setNotes);
      console.log('check rerender from getCollectionData() useEffect');
    }
  }, [user, newNote]);

  // outside of the component
  async function getCollectionData() {
    const snapshot = await db
      .collection('testCollection')
      .doc(user.uid)
      .collection('Notes')
      .get();
    const storedNotes = await Promise.all(
      snapshot.docs.map(async (doc) => await doc.data())
    );
    console.log('check rerender from the getCollectionData function itself');
    return storedNotes;
  }

  // If the user's ID hasn't loaded, show that the page is loading
  if (!user) {
    return <h1>loading...</h1>;
  }

  /////////////////////////////////////////////////////////////////

  // Handles input field for note title
  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  // Handles input field for new note body
  const handleBodyChange = (e) => {
    setInputBody(e.target.value);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/login');
  };

  // Adding new note to FireBase
  const AddNewNote = (e) => {
    e.preventDefault();

    let RandomID = returnRandomNumber();

    db.collection('testCollection')
      .doc(user.uid)
      .collection('Notes')
      .doc(RandomID)
      .set({
        Title: inputTitle,
        Content: inputBody,
        LastEdit: firebase.firestore.FieldValue.serverTimestamp(),
        DocumentID: RandomID,
      })
      .then(function () {
        console.log('Document successfully written!');

        setNewNote({
          Title: inputTitle,
          Content: inputBody,
          LastEdit: firebase.firestore.FieldValue.serverTimestamp(),
          DocumentID: RandomID,
        });

        setNotes((allNotes) => [...allNotes, newNote]);

        setInputTitle('');
        setInputBody('');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  function returnRandomNumber() {
    return Math.random().toString(36).substring(2);
  }

  // Test button to push static info to FireBase
  // const addInfo = () => {
  //   db.collection("testCollection").doc(userID).collection("Notes").doc().set({
  //     Title: "Hello World",
  //     Content: "This is my first firebase applicati"
  //   })
  //   .then(function() {
  //       console.log("Document successfully written!");
  //   })
  //   .catch(function(error) {
  //       console.error("Error writing document: ", error);
  //   });
  // }

  // Mapped array that's output to the DOM
  const NotesToRender = allNotes.map((item) => {
    console.log(item.DocumentID);
    return (
      <Note
        key={item.DocumentID}
        Title={item.Title}
        Body={item.Content}
        DocumentID={item.DocumentID}
        UserID={user.uid}
      />
    );
  });

  return (
    <section className="section">
      <div className="container content">
        <p>Welcome to the home page</p>
        <ul>
          <li>Goog morning!: {user.email} </li>
          <li>User ID: {user.uid} </li>
        </ul>
        <button className="button is-info" onClick={handleLogout}>
          Logout
        </button>

        <form onSubmit={AddNewNote}>
          <div className="field">
            <label className="label">Note Title</label>
            <div className="control">
              <input
                required
                className="input"
                type="text"
                placeholder="Title"
                onChange={handleTitleChange}
                value={inputTitle}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Note</label>
            <div className="control">
              <textarea
                required
                className="textarea"
                placeholder="Add your note"
                onChange={handleBodyChange}
                value={inputBody}
              ></textarea>
            </div>
          </div>

          <button type="submit" className="button is-size-5 is-info">
            Add Note to Firestore
          </button>
        </form>

        <hr />

        <div className="content">
          <h1 className="is-size-3 has-text-weight-bold">Notes</h1>
          {NotesToRender}
        </div>
      </div>
    </section>
  );
};

export default Home;
