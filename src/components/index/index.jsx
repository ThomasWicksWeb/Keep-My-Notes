import React from 'react';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import Emoji from '../Misc/Emoji';
import styles from './Index.module.scss';

const IndexPage = () => {
  return (
    <section
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
  );
};

export default IndexPage;
