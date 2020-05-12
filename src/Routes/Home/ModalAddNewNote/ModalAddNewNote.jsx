import React, { useState } from 'react';
import classnames from 'classnames';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { db } from '../../../firebase';
import styles from './ModalAddNewNote.module.scss';

const ModalAddNewNote = ({ UserID, toggleModal, isOpen, setNewNote }) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  // Handles input field for new note title
  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  // Handles input field for new note body
  const handleBodyChange = (e) => {
    setInputBody(e.target.value);
  };

  // Function to add a new note
  const AddNewNote = (e) => {
    e.preventDefault();

    // Assigning custom, random ID to the document
    const RandomID = Math.random().toString(36).substring(2);

    // Adding new data to Firebase
    db.collection('users')
      .doc(UserID)
      .collection('Notes')
      .doc(RandomID)
      .set({
        Title: inputTitle,
        Content: inputBody,
        LastEdit: firebase.firestore.FieldValue.serverTimestamp(),
        DateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        DocumentID: RandomID,
      })
      .then(function () {
        setInputTitle(''); // Clear input fields
        setInputBody('');
        setNewNote({}); // Set NewNote state to an empty object (No longer causes duplicate key issues)
        toggleModal(); // Close modal
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };

  if (isOpen === true) {
    return (
      <aside className="modal is-active">

        <div className="modal-background" onClick={toggleModal}></div>
        <div className={classnames('modal-card', styles.modal)}>
          <header className="modal-card-head">
            <div className="modal-card-title">
              <h4 className="has-text-weight-bold">Add New Note</h4>
            </div>
            <button
              onClick={toggleModal}
              className={classnames('delete', styles.delete)}
              aria-label="close"
            ></button>
          </header>

          <section className="modal-card-body">
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

              <div className={styles.buttonContainer}>
                <button className="button is-info" type="submit">
                  Add Note
                </button>
                <button className="button" onClick={toggleModal}>
                  Cancel
                </button>
              </div>
            </form>
          </section>
        </div>
      </aside>
    );
  } else {
    return <></>;
  }
};

ModalAddNewNote.propType = {
  UserID: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setNewNote: PropTypes.func.isRequired,
};

export default ModalAddNewNote;
