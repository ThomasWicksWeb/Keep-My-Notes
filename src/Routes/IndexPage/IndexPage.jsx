import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import * as firebase from 'firebase/app';

import Emoji from '../../components/Emoji';
import TextPhotoBlock from './TextPhotoBlock';
import styles from './Index.module.scss';
import TextPhotoBlockReversed from './TextPhotoBlockReversed';

const IndexPage = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    // setUser will take the whole user object. not point in storing mail and id separately :)
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // Buttons in the 'call to action' are dependent on if a user is logged in or not
  const CheckCallToActionButton = () => {
    if (user) {
      return (
        <strong>
          <Link className="button is-info" to="/notes">
            View My Notes
          </Link>
        </strong>
      );
    } else {
      return (
        <strong className={styles.groupedButtons}>
          <Link className="button is-info" to="/createaccount">
            Create an Account
          </Link>
          <Link className="button" to="/login">
            Login
          </Link>
        </strong>
      );
    }
  };

  return (
    <>
      <section className="section">
        <article className={classnames('container', styles.MainWrapper)}>
          <div className={classnames('content', styles.content)}>
            <h2 className={classnames('is-size-1', styles.ScriptFont)}>
              Keep My Notes <Emoji Emoji="📝" Label="Note Pad" />
            </h2>
            <p className="is-size-4">
              The lightning fast <Emoji Emoji="⚡" Label="Lightning Bolt" /> and
              lightweight <Emoji Emoji="☁️" label="Lightweight" /> notes app
            </p>
            {CheckCallToActionButton()}
          </div>
          <div className={styles.ImageContent}>
            <img
              src="./images/KeepMyNotesIndexBackground.svg"
              alt="Home page splash"
            />
          </div>
        </article>
      </section>

      <div className="container">
        <TextPhotoBlock
          header="Stored in the cloud"
          emoji="🌥️"
          emojiLabel="High above in the cloud!"
          paragraph1="All your data is backed up in the cloud so once you create a note, so there's zero worry that you'll lose it"
          img={'./images/UndrawCloudSync.svg'}
        />

        <hr />

        <TextPhotoBlockReversed
          header="Completely Secured Data"
          emoji="🔒"
          emojiLabel="Locked' n' secure!"
          paragraph1="All of your notes are privately and securely stored on Google's servers, for your eyes only"
          paragraph2="So not only are your notes safe from hackers, but your notes will reach you in milliseconds with Google's infrastructure"
          img={'./images/UndrawSecurity.svg'}
        />
      </div>

      <Helmet>
        <title>Welcome | Keep My Notes</title>
      </Helmet>
    </>
  );
};

export default IndexPage;
