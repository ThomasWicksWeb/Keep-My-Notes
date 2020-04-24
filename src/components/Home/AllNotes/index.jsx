import React from 'react';
import classnames from 'classnames';
import Note from '../Note';
import styles from './AllNotes.module.scss';

const CheckIfNotesExist = ({ allNotes, user, setNewNote }) => {
  // If there aren't any notes, display text saying so
  if (allNotes.length === 0) {
    return (
      <h1 className="has-text-centered is-size-5 has-text-weight-normal">
        <span className="has-text-weight-bold is-size-4">
          Whoops! No notes yet!
        </span>
        <br />
        Click the button above to create a note and start your collection!
      </h1>
    );
  } else if (allNotes.length >= 1) {
    // If notes exist, map them to NotesToRender then return it
    const NotesToRender = allNotes.map((item) => {
      return (
        <Note
          key={item.DocumentID}
          Title={item.Title}
          Body={item.Content}
          DocumentID={item.DocumentID}
          UserID={user.uid}
          user={user}
          setNewNote={setNewNote}
        />
      );
    });
    return (
      <main
        className={classnames('columns is-vcentered', styles.notesContainer)}
      >
        {NotesToRender}
      </main>
    );
  }
};

export default CheckIfNotesExist;
