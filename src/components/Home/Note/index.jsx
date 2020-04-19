import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { db } from '../../../firebase';

const Note = ({ Title, Body, DocumentID }) => {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('check rerender from user auth() useEffect in <Note />');
      setUser(user);
    });
  }, []);

  const handleEditNote = () => {
    db.collection('testCollection')
      .doc(user.uid)
      .collection('Notes')
      .doc(DocumentID)
      .update({
        Content: 'This is new content!333!!!',
      });
  };

  return (
    <div className="box">
      <h1 className="is-size-4 has-text-weight-bold">{Title}</h1>
      <p className="is-size-6">{Body}</p>
      <button onClick={handleEditNote}>Edit</button>
    </div>
  );
};

export default Note;
