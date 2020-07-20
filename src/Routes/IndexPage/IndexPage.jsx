import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import { AuthContext } from '../../contexts/AuthContext';

import { TextPhotoBlock } from './TextPhotoBlock';
import { TextPhotoBlockReversed } from './TextPhotoBlockReversed';
import { CheckBoxListItem } from './CheckBoxListItem';
import Emoji from '../../components/Emoji';
import styles from './Index.module.scss';

// Images
import NotesExampleImage from '../../images/screenshot-notes.png';
import FileSearchImage from '../../images/file-search.svg';

import CheckmarkImage from '../../images/checkmark.svg'
import ResponsiveImage from '../../images/responsive.svg'
import FileSyncImage from '../../images/sync-files.svg'

const IndexPage = () => {
  const { userState } = useContext(AuthContext);

  // Buttons in the 'call to action' are dependent on if a user is logged in or not
  const CheckCallToActionButton = () => {
    if (userState) {
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
      <section
        className={classnames('section', styles.SplashSection)}
        // style={backgroundImageURL}
      >
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
          header="Note taking, kept super simple"
          emoji="📝"
          emojiLabel="Notepad"
          paragraph1="A super simple notes app with none of the bloat."
          paragraph2="It's so easy to find over-engineered applications these days, one of the main goals with Keep My Notes was to keep is straight-forward and easy to use."
          img={NotesExampleImage}
        />

        <hr />

        <h3 className="is-size-2 has-text-centered has-text-weight-bold block">What we do well</h3>
        <ul className={classnames('container', styles.ListItemContainer)}>
          <CheckBoxListItem
            img={ResponsiveImage}
            imgAlt="Responsive design"
            title="Works on all platforms"
            subtitle="From your phone to laptop to desktop"
          />
          <CheckBoxListItem
            img={CheckmarkImage}
            imgAlt="Checkmark! Easy and simple to use!"
            title="Super simple and easy to use"
            subtitle="Easy to pickup Keep My Notes in just a few minutes"
          />
          <CheckBoxListItem
            img={FileSyncImage}
            imgAlt="Notes are synced across all devices! Neato!"
            title="Synced Across all devices"
            subtitle="Your notes are wherever you are"
          />
        </ul>

        <hr />

        <TextPhotoBlockReversed
          header="Easily search through all of your notes"
          emoji=" 🔎"
          emojiLabel="Searchin' searchin' searchin'!"
          paragraph1="With our powerful search, you're able to easily find any of your notes in your collection."
          paragraph2="There's no longer any need to worry about endlessly scrolling through all of your notes to find the one you're looking for - all of that hassle is far behind you."
          img={FileSearchImage}
        />
      </div>

      <Helmet>
        <title>Welcome | Keep My Notes</title>
        <meta
          name="description"
          content="Keep My Notes - the lightning fast notes app on the web!"
        />
      </Helmet>
    </>
  );
};

export default IndexPage;
