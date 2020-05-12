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

  // Filters select
  const [selectVal, setSelectedVal] = useState('desc');

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
  }, [user, newNote, selectVal]);

  // If the user's ID hasn't loaded, show that the page is loading
  if (!user) {
    return <></>;
  }

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelectedVal(e.target.value);
  };

  // Toggle Add New Note modal
  const toggleModalAddNewNote = () => {
    setModalAddNewNote(!isOpenAddNewNote);
  };

  // Async retrieves notes from Firebase Firestore for current user
  async function getCollectionData() {
    console.log('Calling firebase');

    if (selectVal === 'desc' || selectVal === 'asc') {
      const snapshot = await db
        .collection('users')
        .doc(user.uid)
        .collection('Notes')
        .orderBy('LastEdit', selectVal)
        .get();
      const storedNotes = await Promise.all(
        snapshot.docs.map(async (doc) => await doc.data())
      );
      return storedNotes;
    } else {
      const snapshot = await db
        .collection('users')
        .doc(user.uid)
        .collection('Notes')
        .orderBy('Title')
        .get();
      const storedNotes = await Promise.all(
        snapshot.docs.map(async (doc) => await doc.data())
      );
      return storedNotes;
    }
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
          <button
            className={classnames('button is-info', styles.createNoteButton)}
            onClick={toggleModalAddNewNote}
          >
            <strong>
              Create Note <i className="fas fa-plus"></i>
            </strong>
          </button>
          {/* <div className={styles.CreateAndSearchParent}> */}
          <div className={styles.FilterAndSearch}>
            {/* <button
              className={classnames('button is-info', styles.createNoteButton)}
              onClick={toggleModalAddNewNote}
            >
              <strong>
                Create Note <i className="fas fa-plus"></i>
              </strong>
            </button> */}

            <div className="select">
              <select value={selectVal} onChange={handleSelectChange}>
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>

            <div className={classnames('field', styles.searchContainer)}>
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  placeholder="Search notes"
                  value={SearchInput}
                  onChange={handleSearchInput}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
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
