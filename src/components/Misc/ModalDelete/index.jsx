import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../../../firebase';

const ModalDelete = ({
  Title,
  DocumentID,
  UserID,
  toggleModalDelete,
  isOpen,
  setNewNote,
}) => {
  const DeleteNote = (e) => {
    e.preventDefault();

    db.collection('testCollection')
      .doc(UserID)
      .collection('Notes')
      .doc(DocumentID)
      .delete()
      .then(() => {
        setNewNote();
        console.log('Deleted!');
      });

    // Close modal on update
    toggleModalDelete();
  };

  if (isOpen === true) {
    return (
      <aside className="modal is-active">
        <div className="modal-background" onClick={toggleModalDelete}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">
              <h4 className="has-text-weight-normal">
                Are you sure you want to delete <hr />
                <span className="has-text-weight-bold">{Title}</span>?
              </h4>
            </div>
            <button
              onClick={toggleModalDelete}
              className="delete"
              aria-label="close"
            ></button>
          </header>

          <section className="modal-card-body">
            <form onSubmit={DeleteNote}>
              <div className="field">
                <button className="button is-danger" type="submit">
                  Delete
                </button>
                <button className="button" onClick={toggleModalDelete}>
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

export default ModalDelete;
