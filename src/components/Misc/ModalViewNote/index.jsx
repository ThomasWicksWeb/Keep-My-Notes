import React from 'react';
import classnames from 'classnames';
import styles from './ModalViewNote.module.scss';

const ModalViewNote = ({ Title, Body, toggleModal, isOpen }) => {
  if (isOpen === true) {
    return (
      <aside className="modal is-active">
        <div className="modal-background" onClick={toggleModal}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">
              <h4 className="has-text-weight-bold">{Title}</h4>
            </div>
            <button
              onClick={toggleModal}
              className={classnames('delete', styles.delete)}
              aria-label="close"
            ></button>
          </header>

          <section className="modal-card-body">
            <p className="is-size-6">{Body}</p>
          </section>
          <footer className="modal-card-footer quickActionButtons"></footer>
        </div>
      </aside>
    );
  } else {
    return <></>;
  }
};

export default ModalViewNote;
