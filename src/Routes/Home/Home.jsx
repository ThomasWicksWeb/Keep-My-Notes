import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

// Firebase
import { db } from '../../firebase';

// Import Auth Context
import { AuthContext } from '../../contexts/AuthContext';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  // User data from AuthContext
  const { userState } = useContext(AuthContext);

  // 'Add Note' modal is clased by default
  const [isOpenAddNewNote, setModalAddNewNote] = useState(false);

  // Data for a new note to be added to Firebase
  const [newNote, setNewNote] = useState({});

  // Array of all notes
  const [allNotes, setNotes] = useState([]);

  // Search field input
  const [SearchInput, setSearchInput] = useState('');

  // Value for the <selevt> element to filter notes
  const [selectVal, setSelectedVal] = useState('desc');

  // Fetches user's notes from Firestore once the user state is set
  useEffect(() => {
    if (userState) {
      getCollectionData(userState.uid).then(setNotes);
    }
  }, [userState, newNote]);

  // If the user's ID hasn't loaded, show nothing
  if (!userState) {
    return <></>;
  }

  // Get initial set of notes from FireBase on page load
  async function getCollectionData() {
    const snapshot = await db
      .collection('users')
      .doc(userState.uid)
      .collection('Notes')
      .orderBy('LastEdit', 'desc')
      .get();
    const storedNotes = await Promise.all(
      snapshot.docs.map(async (doc) => await doc.data())
    );
    return storedNotes;
  }

  // Handle search bar input
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle <select> filter input
  const handleSelectChange = (e) => {
    const target = e.target.value;
    setSelectedVal(target);

    // Based on the selected sort value, sort the locally stored notes in selected order and update state

    // Sort by more recently added/updated notes
    if (target === 'desc') {
      const SortedNotes = allNotes.sort((a, b) =>
        a.LastEdit < b.LastEdit ? 1 : -1
      );
      setNotes(SortedNotes);

      // Sort by oldest notes
    } else if (target === 'asc') {
      const SortedNotes = allNotes.sort((a, b) =>
        b.LastEdit < a.LastEdit ? 1 : -1
      );
      setNotes(SortedNotes);

      // Sort notes alphabetically A -> Z
    } else if (target === 'alphabeticalDesc') {
      const SortedNotes = allNotes.sort((a, b) => (a.Title > b.Title ? 1 : -1));
      setNotes(SortedNotes);

      // Sort notes alphabetically Z -> A
    } else if (target === 'alphabeticalAsc') {
      const SortedNotes = allNotes.sort((a, b) => (b.Title > a.Title ? 1 : -1));
      setNotes(SortedNotes);
    }
  };

  // Green success notification
  const NotificationSuccess = (text) => {
    toast.success(text, {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  // Red danger notification
  const NotificationDanger = (text) => {
    toast.error(text, {
      position: 'top-center',
      autoClose: 3000,
    });
  };

  // Toggle Add New Note modal
  const toggleModalAddNewNote = () => {
    setModalAddNewNote(!isOpenAddNewNote);
  };

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
                <option value="alphabeticalDesc">Alphabetical A -> Z</option>
                <option value="alphabeticalAsc">Alphabetical Z -> A</option>
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
            user={userState} // Pass user object for FireBase calls
            setNewNote={setNewNote} // Function to add a new note to FireBase
            allNotes={allNotes} // Array of 'note' objects
            SearchInput={SearchInput} // Pass search input for .filter
            NotificationSuccess={NotificationSuccess} // Notification needs to be passed as a prop or else it will not be shown
            NotificationDanger={NotificationDanger} // Notification needs to be passed as a prop or else it will not be shown
          />
        </div>
      </div>

      {/* Modal to add new note, doesn't matter where it's placed on the page here */}
      <ModalAddNewNote
        NotificationSuccess={NotificationSuccess}
        UserID={userState.uid}
        toggleModal={toggleModalAddNewNote}
        isOpen={isOpenAddNewNote}
        setNewNote={setNewNote}
      />
      <Helmet>
        <title>Notes | Keep My Notes</title>
        <meta name="description" content="View all your notes..." />
      </Helmet>
    </section>
  );
};

export default Home;
