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

  // Input fields
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  // Data for a new note to be added to Firebase
  const [newNote, setNewNote] = useState({
    Title: '',
    Content: '',
    LastEdit: new Date(),
    DocumentID: 0,
  });

  const history = useHistory();

  /////////////////////////////////////////////////////////////////

  useEffect(() => {
    // setUser will take the whole user object. not point in storing mail and id separately :)
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getCollectionData(user.uid).then(setNotes);
    }
  }, [user, newNote]);

  // Retrieves notes from Firebase
  async function getCollectionData() {
    const snapshot = await db
      .collection('testCollection')
      .doc(user.uid)
      .collection('Notes')
      .orderBy('LastEdit', 'desc')
      .get();
    const storedNotes = await Promise.all(
      snapshot.docs.map(async (doc) => await doc.data())
    );
    console.log('Calling firebase');
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

  // Handles user logout
  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/login');
  };

  // Adding new note to FireBase
  const AddNewNote = (e) => {
    e.preventDefault();

    // Assigning a random number for the document ID
    let RandomID = returnRandomNumber();

    // Adding new data to Firebase
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

        // Setting the new note state
        setNewNote({
          Title: inputTitle,
          Content: inputBody,
          LastEdit: firebase.firestore.FieldValue.serverTimestamp(),
          DocumentID: RandomID,
        });

        // Adding the singular new note to the allNotes array
        setNotes((allNotes) => [...allNotes, newNote]);

        // Clearing input fields
        setInputTitle('');
        setInputBody('');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  // Returns a random 11 length alphanumberic string
  function returnRandomNumber() {
    return Math.random().toString(36).substring(2);
  }

  // Mapped array that's output to the DOM
  // const NotesToRender = allNotes.map((item) => {
  //   return (
  //     <Note
  //       key={item.DocumentID}
  //       Title={item.Title}
  //       Body={item.Content}
  //       DocumentID={item.DocumentID}
  //       UserID={user.uid}
  //       user={user}
  //       setNewNote={setNewNote}
  //     />
  //   );
  // });

  const CheckIfNotesExist = () => {
    if(allNotes.length === 0){
      return <h1>Add notes!</h1>
    } else {
      const NotesToRender = allNotes.map((item) => {
        return (
          <Note
            key={item.DocumentID}
            Title={item.Title}
            Body={item.Content}
            DocumentID={item.DocumentID}
            UserID={user.uid}
            user={user}
            setNewNote={setNewNote}
          />
        );
      });
      return NotesToRender
    }
  }


  
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
          {/* {NotesToRender} */}
          <CheckIfNotesExist />
        </div>
      </div>
    </section>
  );
};

export default Home;
