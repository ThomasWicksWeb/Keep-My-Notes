import React, { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';

// Firebase
import { db } from '../../firebase';

// Import Auth Context
import { AuthContext } from '../../contexts/AuthContext';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom components
import { AllNotes } from './AllNotes';
import { CreateNote } from './CreateNote';
import { ModalAddNewNote } from './ModalAddNewNote';
import { FilterAndSearch } from './FilterAndSearch';
import Emoji from '../../components/Emoji';

// Styling
import 'bulma/css/bulma.css';

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
      <div className="container content">
        <div className="content">
          <h1 className="is-size-2 has-text-weight-bold">
            <strong>
              My Notes <Emoji Emoji="✏️" Label="Note Pad" />
            </strong>
          </h1>
          <hr />

          {/* Button to open a modal to create a new note */}
          <CreateNote toggleModalAddNewNote={toggleModalAddNewNote} />

          {/* <select> filters and search input */}
          <FilterAndSearch
            setNotes={setNotes}
            setSearchInput={setSearchInput}
            setSelectedVal={setSelectedVal}
            selectVal={selectVal}
            allNotes={allNotes}
            SearchInput={SearchInput}
          />

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
      <ToastContainer /> 
      <Helmet>
        <title>Notes | Keep My Notes</title>
        <meta name="description" content="View all your notes..." />
      </Helmet>
    </section>
  );
};

export default Home;
