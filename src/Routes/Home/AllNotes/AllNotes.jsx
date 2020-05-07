import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Note } from '../Note';
import Emoji from '../../../components/Emoji';
import styles from './AllNotes.module.scss';

// If no notes exist for the user, return placeholder <div> letting the user know that no notes exist
// Else return their entire collection of notes
const CheckIfNotesExist = ({ allNotes, user, setNewNote }) => {
  // If there aren't any notes, display text saying so
  if (allNotes.length === 0) {
    return (
      <h1 className="has-text-centered is-size-5 has-text-weight-normal">
        <span className="has-text-weight-bold is-size-3">
          Whoops! No notes yet!
        </span>
        <br />
        Click the button above to create a note and start your collection{' '}
        <Emoji Emoji="😁" Label="Smiley face :)" />
      </h1>
    );
  } else if (allNotes.length >= 1) {
    // If notes exist, map them to MappedNotes then return that object
    const MappedNotes = allNotes.map((note) => {
      return (
        <Note
          key={note.DocumentID}
          note={note}
          user={user}
          setNewNote={setNewNote}
        />
      );
    });
    return (
      <main
        className={classnames('columns is-vcentered', styles.notesContainer)}
      >
        {MappedNotes}
      </main>
    );
  }
};

CheckIfNotesExist.propType = {
  allNotes: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setNewNote: PropTypes.func.isRequired,
};

export default CheckIfNotesExist;
