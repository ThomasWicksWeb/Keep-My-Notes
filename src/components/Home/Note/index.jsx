import React, { useState } from 'react';
import './Note.scss';
import ModalEdit from '../../Misc/ModalEdit';
import ModalDelete from '../../Misc/ModalDelete';

const Note = ({ Title, Body, DocumentID, user, setNewNote }) => {
  const [isOpen, setModal] = useState(false);
  const [isOpenDelete, setModalDelete] = useState(false);

  const toggleModalEdit = () => {
    setModal(!isOpen);
  };

  const toggleModalDelete = () => {
    setModalDelete(!isOpenDelete);
  };

  return (
    <div className="box">
      <h2 className="has-text-weight-bold is-size-4">{Title}</h2>
      <p className="is-size-6">{Body}</p>
      <i className="fas fa-edit note-edit" onClick={toggleModalEdit}></i>
      <i
        className="fas fa-trash-alt note-garbage"
        onClick={toggleModalDelete}
      ></i>
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
