import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';

import firebase from 'firebase';
import { db } from '../../firebase';

import GreetingHeader from './GreetingHeader';
import Note from './Note';
import ModalAddNewNote from '../Misc/ModalAddNewNote';
import 'bulma/css/bulma.css';
import styles from './Home.module.scss';
// import '../../darkmode.scss';

const Home = () => {
  // User specific data
  const [user, setUser] = useState('');

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

  const history = useHistory();

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
    return <h1>loading...</h1>;
  }

  // Handles user logout
  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/login');
  };

  const CheckIfNotesExist = () => {
    if (allNotes.length === 0) {
      return (
        <h1 className="has-text-centered is-size-5 has-text-weight-normal">
          <span className="has-text-weight-bold is-size-4">
            Whoops! No notes yet!
          </span>
          <br />
          Click the button above to create a note and start your collection!
        </h1>
      );
    } else if (allNotes.length >= 1) {
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
      // return NotesToRender;
      return (
        <main
          className={classnames('columns is-vcentered', styles.notesContainer)}
        >
          {NotesToRender}
        </main>
      );
    }
  };

  return (
    <section className="section">
      <div className="container content">
        <GreetingHeader user={user} />

        <button className="button is-info" onClick={handleLogout}>
          Logout
        </button>

        <hr />

        <div className="content">
          <h1 className="is-size-2 has-text-weight-bold">My Notes</h1>
          <hr />
          <button
            className={classnames('button is-info', styles.createNoteButton)}
            onClick={toggleModalAddNewNote}
          >
            Create Note <i className="fas fa-plus"></i>
          </button>

          {/* If notes exist, render them, else render placeholder */}
          <CheckIfNotesExist />

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
