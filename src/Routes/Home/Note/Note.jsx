import React, { useState } from 'react';
import classnames from 'classnames';
import './Note.scss';
import styles from './NoteModule.module.scss';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import ModalViewNote from './ModalViewNote';

const Note = ({ Title, Body, DocumentID, user, setNewNote, LastEdit }) => {
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

  const CheckTextLength = () => {
    if (Body.length > 175) {
      return (
        <p className="is-size-6">
          {Body.substring(0, 255)}...{' '}
          <span className="NoteViewMore" onClick={toggleModalViewNote}>
            View note
          </span>
        </p>
      );
    } else {
      return <p className="is-size-6">{Body}</p>;
    }
  };

  return (
    <div className={classnames('box', styles.NoteBox)}>
      <h2 className="has-text-weight-bold is-size-4">
        <strong>{Title}</strong>
      </h2>
      {/* <h6 className="is-size-7 has-text-light-grey">{LastEdit.getDate()}</h6> */}
      <div>{CheckTextLength()}</div>
      <div className="quickActionButtons">
        <i className="fas fa-edit note-edit" onClick={toggleModalEdit}></i>
        <i
          className="fas fa-trash-alt note-garbage swing"
          onClick={toggleModalDelete}
        ></i>
        {/* <button className="link" onClick={toggleModalViewNote}>View Note</button> */}
      </div>

      <ModalViewNote
        Title={Title}
        Body={Body}
        toggleModal={toggleModalViewNote}
        isOpen={isOpenViewNote}
      />

      <ModalEdit
        Title={Title}
        Body={Body}
        DocumentID={DocumentID}
        UserID={user.uid}
        toggleModal={toggleModalEdit}
        isOpen={isOpen}
        setNewNote={setNewNote}
      />

      <ModalDelete
        Title={Title}
        DocumentID={DocumentID}
        UserID={user.uid}
        toggleModalDelete={toggleModalDelete}
        isOpen={isOpenDelete}
        setNewNote={setNewNote}
      />
    </div>
  );
};

export default Note;
