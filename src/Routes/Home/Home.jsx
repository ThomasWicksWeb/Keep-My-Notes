import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

// Firebase
import firebase from 'firebase';
import { db } from '../../firebase';

// Custom components
import { AllNotes } from './AllNotes';
import { ModalAddNewNote } from './ModalAddNewNote';
import Emoji from '../../components/Emoji';

// Third party
import classnames from 'classnames';

// Styling
import 'bulma/css/bulma.css';
import styles from './Home.module.scss';

const Home = () => {
  // User specific data
  const [user, setUser] = useState('');

  // 'Add Note' modal is clased by default
  const [isOpenAddNewNote, setModalAddNewNote] = useState(false);

  // Array of all notes
  const [allNotes, setNotes] = useState([]);

  // Search field input
  const [SearchInput, setSearchInput] = useState('');

  // Data for a new note to be added to Firebase
  const [newNote, setNewNote] = useState({
    Title: '',
    Content: '',
    LastEdit: new Date(),
    DocumentID: 0,
  });

  // On component load, get the current user and assign that returned object to the local 'user' state
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // Fetches user's notes from Firestore once the user state is set
  useEffect(() => {
    if (user) {
      getCollectionData(user.uid).then(setNotes);
    }
  }, [user, newNote]);

  // If the user's ID hasn't loaded, show that the page is loading
  if (!user) {
    return <></>;
  }

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // Toggle Add New Note modal
  const toggleModalAddNewNote = () => {
    setModalAddNewNote(!isOpenAddNewNote);
  };

  // Async retrieves notes from Firebase Firestore for current user
  async function getCollectionData() {
    const snapshot = await db
      .collection('users')
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

  return (
    <section className="section">
      <div className="container content">
        <div className="content">
          <h1 className="is-size-2 has-text-weight-bold">
            <strong>
              My Notes <Emoji Emoji="✏️" Label="Note Pad" />
            </strong>
          </h1>
          <hr />
          <div className={styles.CreateAndSearchParent}>
            <button
              className={classnames('button is-info', styles.createNoteButton)}
              onClick={toggleModalAddNewNote}
            >
              <strong>
                Create Note <i className="fas fa-plus"></i>
              </strong>
            </button>

            <div class="field">
              <p class="control has-icons-left">
                <input
                  class="input"
                  type="email"
                  placeholder="Search notes"
                  value={SearchInput}
                  onChange={handleSearchInput}
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>

          {/* If notes exist, render them, else render placeholder */}
          <AllNotes
            user={user}
            setNewNote={setNewNote}
            allNotes={allNotes}
            SearchInput={SearchInput}
          />
        </div>
      </div>

      {/* Modal to add new note, doesn't matter where it's placed on the page here */}
      <ModalAddNewNote
        UserID={user.uid}
        toggleModal={toggleModalAddNewNote}
        isOpen={isOpenAddNewNote}
        setNewNote={setNewNote}
      />
      <Helmet>
        <title>Notes | Keep My Notes</title>
      </Helmet>
    </section>
  );
};

export default Home;
