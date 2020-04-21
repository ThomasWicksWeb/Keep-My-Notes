import React, { useState, useEffect } from 'react';
import './Note.scss';
import Modal from '../../Misc/Modal';
import ModalDelete from '../../Misc/ModalDelete';

const Note = ({ Title, Body, DocumentID, user, setNewNote }) => {
  const [isOpen, setModal] = useState(false);
  const [isOpenDelete, setModalDelete] = useState(false);

  const toggleModal = () => {
    setModal(!isOpen);
  };

  const toggleModalDelete = () => {
    setModalDelete(!isOpen);
  };

  return (
    <div className="box">
      <h2 className="has-text-weight-bold is-size-4">{Title}</h2>
      <p className="is-size-6">{Body}</p>
      <i className="fas fa-edit note-edit" onClick={toggleModal}></i>
      <i
        className="fas fa-trash-alt note-garbage"
        onClick={toggleModalDelete}
      ></i>
      <Modal
        Title={Title}
        Body={Body}
        DocumentID={DocumentID}
        UserID={user.uid}
        toggleModal={toggleModal}
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
