import React, { useState, useEffect } from 'react';

// Firebase
import firebase from 'firebase';
import { db } from '../../firebase';

// Custom components
import GreetingHeader from './GreetingHeader';
import AllNotes from './AllNotes';
import ModalAddNewNote from '../Misc/ModalAddNewNote';
import Loading from '../Misc/Loading';

// Third party
import classnames from 'classnames';

// Styling
import 'bulma/css/bulma.css';
import styles from './Home.module.scss';
// import '../../darkmode.scss';

const Home = () => {
  // User specific data
  const [user, setUser] = useState('');

  // 'Add Note' modal is clased by default
  const [isOpenAddNewNote, setModalAddNewNote] = useState(false);

  // Array of all notes
  const [allNotes, setNotes] = useState([]);

  // Data for a new note to be added to Firebase
  const [newNote, setNewNote] = useState({
    Title: '',
    Content: '',
    LastEdit: new Date(),
    DocumentID: 0,
  });

  useEffect(() => {
    // Forces the loader to appear for a minimum of 1.2 second, otherwise the loader flashses and it's jarring
    setTimeout(() => {
      firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      });
    }, 1200);
  }, []);

  // Fetches user's notes from Firestore once the user is set
  useEffect(() => {
    if (user) {
      getCollectionData(user.uid).then(setNotes);
    }
  }, [user, newNote]);

  const toggleModalAddNewNote = () => {
    setModalAddNewNote(!isOpenAddNewNote);
  };

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
    function IsLoading() {
      return <Loading />;
    }
    return IsLoading();
  }

  return (
    <section className="section">
      <div className="container content">
        <GreetingHeader />

        <div className="content">
          <h1 className="is-size-2 has-text-weight-bold">
            <strong>My Notes</strong>
          </h1>
          <hr />
          <button
            className={classnames('button is-info', styles.createNoteButton)}
            onClick={toggleModalAddNewNote}
          >
            <strong>
              Create Note <i className="fas fa-plus"></i>
            </strong>
          </button>

          {/* If notes exist, render them, else render placeholder */}
          <AllNotes user={user} setNewNote={setNewNote} allNotes={allNotes} />
        </div>
      </div>

      {/* Modal to add new note, doesn't matter where it's placed on the page here */}
      <ModalAddNewNote
        UserID={user.uid}
        toggleModal={toggleModalAddNewNote}
        isOpen={isOpenAddNewNote}
        setNewNote={setNewNote}
      />
    </section>
  );
};

export default Home;
