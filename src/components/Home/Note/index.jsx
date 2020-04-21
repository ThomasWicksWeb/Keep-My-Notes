import React, { useState, useEffect } from 'react';
import Modal from '../../Modal';

const Note = ({ Title, Body, DocumentID, user, setNewNote }) => {
  const [isOpen, setModal] = useState(false);

  if(isOpen){

  }

  const toggleModal = () => {
    setModal(!isOpen);
  };

  return (
    <div className="box">
      <h2 className="has-text-weight-bold is-size-3">{Title}</h2>
      <p className="is-size-6">{Body}</p>
      <button
        className="is-size-6 has-text-weight-bold button is-info"
        onClick={toggleModal}
      >
        Edit
      </button>
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
