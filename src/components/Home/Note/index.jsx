import React, { useState, useEffect } from 'react';
import './Note.scss'
import Modal from '../../Modal';

const Note = ({ Title, Body, DocumentID, user, setNewNote }) => {
  const [isOpen, setModal] = useState(false);

  // if(isOpen){

  // }

  const toggleModal = () => {
    setModal(!isOpen);
  };

  return (
    <div className="box">
      <h2 className="has-text-weight-bold is-size-4">{Title}</h2>
      <p className="is-size-6">{Body}</p>
      <i className="fas fa-edit note-edit" onClick={toggleModal}></i>
      <i class="fas fa-trash-alt note-garbage"></i>
      <Modal
        Title={Title}
        Body={Body}
        DocumentID={DocumentID}
        UserID={user.uid}
        toggleModal={toggleModal}
        isOpen={isOpen}
        setNewNote={setNewNote}
      />
    </div>
  );
};

export default Note;
