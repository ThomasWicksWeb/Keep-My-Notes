import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './Note.scss';
import styles from './NoteModule.module.scss';
import { ModalEdit } from './ModalEdit';
import ModalDelete from './ModalDelete';
import ModalViewNote from './ModalViewNote';

const Note = ({ note, user, setNewNote, NotificationSuccess, NotificationDanger }) => {
  const [isOpen, setModal] = useState(false);
  const [isOpenDelete, setModalDelete] = useState(false);
  const [isOpenViewNote, setModalViewNote] = useState(false);

  const toggleModalEdit = () => {
    setModal(!isOpen);
  };

  const toggleModalDelete = () => {
    setModalDelete(!isOpenDelete);
  };

  const toggleModalViewNote = () => {
    setModalViewNote(!isOpenViewNote);
  };

  // If the note is more than 255 characters, trim it there and add 'View Note' button
  // Else return the entire content of the note body
  const CheckTextLength = () => {
    if (note.Content.length > 255) {
      return (
        <p className="is-size-6">
          {note.Content.substring(0, 255)}...{' '}
          <span className="NoteViewMore" onClick={toggleModalViewNote}>
            View note
          </span>
        </p>
      );
    } else {
      return <p className="is-size-6">{note.Content}</p>;
    }
  };

  // Return each <Note />
  return (
    <div className={classnames('box', styles.NoteBox)}>
      <h2 className="has-text-weight-bold is-size-4">
        <strong>{note.Title}</strong>
      </h2>
      <div>{CheckTextLength()}</div>
      <div className="quickActionButtons">
        <i className="fas fa-edit note-edit" onClick={toggleModalEdit}></i>
        <i
          className="fas fa-trash-alt note-garbage swing"
          onClick={toggleModalDelete}
        ></i>
      </div>

      <ModalViewNote
        Title={note.Title}
        Body={note.Content}
        toggleModal={toggleModalViewNote}
        isOpen={isOpenViewNote}
      />

      <ModalEdit
        // Title={note.Title}
        // Body={note.Content}
        // DocumentID={note.DocumentID}
        note={note}
        UserID={user.uid}
        toggleModal={toggleModalEdit}
        isOpen={isOpen}
        setNewNote={setNewNote}
        NotificationSuccess={NotificationSuccess}
      />

      <ModalDelete
        Title={note.Title}
        DocumentID={note.DocumentID}
        UserID={user.uid}
        toggleModalDelete={toggleModalDelete}
        isOpen={isOpenDelete}
        setNewNote={setNewNote}
        NotificationSuccess={NotificationSuccess}
      />
    </div>
  );
};

Note.propType = {
  note: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setNewNote: PropTypes.func.isRequired,
  LastEdit: PropTypes.string.isRequired,
};

export default Note;
