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
// import '../../darkmode.scss'

const Home = () => {
  // User specific data
  const [user, setUser] = useState('');

  const [isOpenAddNewNote, setModalAddNewNote] = useState(false);

  // Array of all notes
  const [allNotes, setNotes] = useState([]);

  // const [RandomID, setRandomID] = useState(0);

  // Input fields
  // const [inputTitle, setInputTitle] = useState('');
  // const [inputBody, setInputBody] = useState('');

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

  /////////////////////////////////////////////////////////////////

  // Handles user logout
  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/login');
  };

  const CheckIfNotesExist = () => {
    if (allNotes.length === 0) {
      return (
        <Note
          key={1234}
          Title={'Click the button above to add a note!'}
          Body={':)'}
          DocumentID={123}
          UserID={user.uid}
          user={user}
          setNewNote={setNewNote}
        />
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
      return NotesToRender;
    }
  };

  return (
    <section className="section">
      <div className="container content">
        <GreetingHeader user={user} />
        <button className="button is-info" onClick={handleLogout}>
          Logout
        </button>
        <p>
          Add new note{' '}
          <i
            className="fas fa-edit note-edit"
            onClick={toggleModalAddNewNote}
          ></i>
        </p>

        <ModalAddNewNote
          UserID={user.uid}
          toggleModal={toggleModalAddNewNote}
          isOpen={isOpenAddNewNote}
          setNewNote={setNewNote}
        />

        {/* <form onSubmit={AddNewNote}>
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
        </form> */}

        <hr />

        <div className="content">
          <h1 className="is-size-3 has-text-weight-bold">My Notes</h1>
          <main
            className={classnames(
              'columns is-vcentered',
              styles.notesContainer
            )}
          >
            <CheckIfNotesExist />
          </main>
        </div>
      </div>
    </section>
  );
};

export default Home;
