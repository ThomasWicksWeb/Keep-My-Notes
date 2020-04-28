import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import classnames from 'classnames';
import styles from './ModalEdit.module.scss';
import { db } from '../../../../firebase';

const Modal = ({
  Title,
  Body,
  DocumentID,
  UserID,
  toggleModal,
  isOpen,
  setNewNote,
}) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  useEffect(() => {
    setInputTitle(Title);
    setInputBody(Body);
  }, []);

  // Handles input field for note title
  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  // Handles input field for new note body
  const handleBodyChange = (e) => {
    setInputBody(e.target.value);
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();

    db.collection('users')
      .doc(UserID)
      .collection('Notes')
      .doc(DocumentID)
      .update({
        Title: inputTitle,
        Content: inputBody,
        DocumentID: DocumentID,
        LastEdit: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setNewNote({
          Title: inputTitle,
          Content: inputBody,
          DocumentID: DocumentID,
          LastEdit: firebase.firestore.FieldValue.serverTimestamp(),
        });
      });

    // Close modal on update
    toggleModal();
  };

  const CheckIfEdited = () => {
    if (Body === inputBody) {
      return (
        <button className="button is-success" disabled type="submit">
          Save changes
        </button>
      );
    } else {
      return (
        <button className="button is-success" type="submit">
          Save changes
        </button>
      );
    }
  };

  if (isOpen === true) {
    return (
      <aside className="modal is-active">
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">
              <h4 className="has-text-weight-bold">Edit Note</h4>
            </div>
            <button
              onClick={toggleModal}
              className={classnames('delete', styles.delete)}
              aria-label="close"
            ></button>
          </header>

          <section className="modal-card-body">
            <form onSubmit={handleUpdateNote}>
              <div className="field">
                <label className="is-size-4 has-text-weight-bold">
                  {inputTitle}
                </label>
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
                {/* <button className="button is-success" type="submit">
                  Save changes
                </button> */}
                {CheckIfEdited()}
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

export default Modal;
