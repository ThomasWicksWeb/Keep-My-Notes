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

  // Handles input field for note title
  const handleTitleChange = (e) => {
    setInputTitle(e.target.value);
  };

  // Handles input field for new note body
  const handleBodyChange = (e) => {
    setInputBody(e.target.value);
  };

  const handleUpdateNote = (e) => {
    db.collection('testCollection')
      .doc(user.uid)
      .collection('Notes')
      .doc(DocumentID)
      .update({
        Title: inputTitle,
        Content: inputBody,
        LastEdit: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  return (
    <div className="box">
      <div className="field">
        <label className="is-size-4 has-text-weight-bold">{inputTitle}</label>
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

      <button className="is-size-6 button is-info" onClick={handleUpdateNote}>
        Save
      </button>
    </div>
  );
};

export default Note;
