import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../../../firebase';

const Note = ({ Title, Body, DocumentID, user }) => {
  const [modal, setModal] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');

  useEffect(() => {
    setInputTitle(Title);
    setInputBody(Body);
  }, []);

  //   const handleEditNote = () => {
  //     db.collection('testCollection')
  //       .doc(user.uid)
  //       .collection('Notes')
  //       .doc(DocumentID)
  //       .update({
  //         Content: 'This is new content!333!!!',
  //       });
  //   };

  // Handles input field for note title

  // const handleTitleChange = (e) => {
  //     setInputTitle(e.target.value);
  //   };

  //   // Handles input field for new note body
  //   const handleBodyChange = (e) => {
  //     setInputBody(e.target.value);
  //   };

  const handleEditTitle = (e) => {
    setInputTitle(e.target.value);

    db.collection('testCollection')
      .doc(user.uid)
      .collection('Notes')
      .doc(DocumentID)
      .update({
        Title: inputTitle,
      });
  };
  
  const handleEditContent = (e) => {
    setInputBody(e.target.value);

    db.collection('testCollection')
      .doc(user.uid)
      .collection('Notes')
      .doc(DocumentID)
      .update({
        Content: inputBody,
      });
  };
  return (
    <div className="box">
      <h1 className="is-size-4 has-text-weight-bold">
        <input value={inputTitle} onChange={handleEditTitle} type="text" />
      </h1>
      <p className="is-size-6">
        <textarea value={inputBody} onChange={handleEditContent} type="text" />
      </p>
      {/* <button onClick={handleEditNote}>Edit</button> */}
    </div>
  );
};

export default Note;
