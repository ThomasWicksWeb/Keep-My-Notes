import React from 'react';
import classnames from 'classnames'

import styles from './CreateNote.module.scss';

const CreateNote = ({ toggleModalAddNewNote }) => {

  
  return (
    <button
      className={classnames('button is-info', styles.createNoteButton)}
      onClick={toggleModalAddNewNote}
    >
      <strong>
        Create Note <i className="fas fa-plus"></i>
      </strong>
    </button>
  );
};

export default CreateNote;