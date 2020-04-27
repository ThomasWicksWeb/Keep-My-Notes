import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import Emoji from '../Misc/Emoji';
import TextPhotoBlock from './TextPhotoBlock';
import styles from './Index.module.scss';
import TextPhotoBlockReversed from './TextPhotoBlockReversed';

const IndexPage = () => {
  return (
    <>
      <section
        // className={classnames('hero is-large', styles.hero)}
        className={classnames('hero is-fullheight-with-navbar', styles.hero)}
      >
        <div className="hero-body">
          <div className="container">
            <h1 className={classnames('title is-size-1', styles.ScriptFont)}>
              Keep My Notes <Emoji Emoji="📝" Label="Note Pad" />
            </h1>
            <h2 className="subtitle is-size-4">
              The lightning fast <Emoji Emoji="⚡" Label="Lightning Bolt" /> and
              lightweight <Emoji Emoji="☁️" label="Lightweight" /> notes app
            </h2>
          </div>
        </div>

        <Helmet>
          <title>Welcome | Keep My Notes</title>
        </Helmet>
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
    </>
  );
};

export default IndexPage;
