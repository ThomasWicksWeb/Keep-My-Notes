import React from 'react';
import classnames from 'classnames';
import { db } from '../../../../firebase';
import styles from './ModalDelete.module.scss';

const ModalDelete = ({
  Title,
  DocumentID,
  UserID,
  toggleModalDelete,
  isOpen,
  setNewNote,
}) => {
  const DeleteNote = (e) => {
    e.preventDefault();

    db.collection('users')
      .doc(UserID)
      .collection('Notes')
      .doc(DocumentID)
      .delete()
      .then(() => {
        setNewNote({});
        console.log('Deleted!');
      });

    // Close modal on update
    toggleModalDelete();
  };

  if (isOpen === true) {
    return (
      <aside className="modal is-active">
        <div className="modal-background" onClick={toggleModalDelete}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">
              <h4 className="has-text-weight-normal">
                Are you sure you want to delete: <br />
                <span className="has-text-weight-bold">{Title}</span>?
              </h4>
            </div>
            <button
              onClick={toggleModalDelete}
              className={classnames('delete', styles.delete)}
              aria-label="close"
            ></button>
          </header>

          <section className="modal-card-body">
            <div className="field">
              <div className={styles.buttonContainer}>
                <button className="button is-danger" onClick={DeleteNote}>
                  Delete
                </button>
                <button className="button" onClick={toggleModalDelete}>
                  Cancel
                </button>
              </div>
            </div>
          </section>
        </div>
      </aside>
    );
  } else {
    return <></>;
  }
};

export default ModalDelete;
