import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

// Firebase
import firebase from 'firebase';
import { db } from '../../firebase';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
// import { NotificationSuccess } from '../../components/NotificationSuccess';
// import { NotificationDanger } from '../../components/NotificationDanger';
// import 'react-toastify/dist/ReactToastify.css';

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

  // Value for the <selevt> element to filter notes
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

  // If the user's ID hasn't loaded, show nothing
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

  // Green success notification
  const NotificationSuccess = (text) => {
    toast.success(text, {
      position: 'top-center',
    });
  };

  // Red danger notification
  const NotificationDanger = (text) => {
    toast.error(text, {
      position: 'top-center',
    });
  };

  // Toggle Add New Note modal
  const toggleModalAddNewNote = () => {
    setModalAddNewNote(!isOpenAddNewNote);
  };

  // Async retrieves notes from Firebase Firestore for current user
  async function getCollectionData() {
    // Sort by desc or asc (desc by default on page load)
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
    } else if (selectVal === 'alphabeticalDesc') {
      // Else sort by alphabetical order A -> Z
      const snapshot = await db
        .collection('users')
        .doc(user.uid)
        .collection('Notes')
        .orderBy('Title', 'asc')
        .get();
      const storedNotes = await Promise.all(
        snapshot.docs.map(async (doc) => await doc.data())
      );
      return storedNotes;
    } else {
      // Else sort by alphabetical order Z -> A
      const snapshot = await db
        .collection('users')
        .doc(user.uid)
        .collection('Notes')
        .orderBy('Title', 'desc')
        .get();
      const storedNotes = await Promise.all(
        snapshot.docs.map(async (doc) => await doc.data())
      );
      return storedNotes;
    }
  }

  return (
    <section className="section">
      <ToastContainer />

      <div className="container content">
        <div className="content">
          <h1 className="is-size-2 has-text-weight-bold">
            <strong>
              My Notes <Emoji Emoji="✏️" Label="Note Pad" />
            </strong>
          </h1>

          <hr />

          {/* Button to open modal to create new note */}
          <button
            className={classnames('button is-info', styles.createNoteButton)}
            onClick={toggleModalAddNewNote}
          >
            <strong>
              Create Note <i className="fas fa-plus"></i>
            </strong>
          </button>

          <div className={styles.FilterAndSearch}>
            {/* Select element to filter notes by */}
            <div className="select">
              <select value={selectVal} onChange={handleSelectChange}>
                <option disabled value="desc">
                  Sort Notes
                </option>
                <option value="desc">Newest</option>
                <option value="asc">Oldest</option>
                <option value="alphabeticalDesc">Alphabetical A->Z</option>
                <option value="alphabeticalAsc">Alphabetical Z->A</option>
              </select>
            </div>

            {/* Input field to search notes */}
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
            NotificationSuccess={NotificationSuccess}
            NotificationDanger={NotificationDanger}
          />
        </div>
      </div>

      {/* Modal to add new note, doesn't matter where it's placed on the page here */}
      <ModalAddNewNote
        NotificationSuccess={NotificationSuccess}
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
