import React from 'react';
import classnames from 'classnames';
import Emoji from '../../Misc/Emoji';
import styles from './TextPhotoBlockReversed.module.scss';

const TextPhotoBlockReversed = ({
  header,
  paragraph1,
  paragraph2,
  img,
  emoji,
  emojiLabel,
}) => {
  return (
    <section className="section">
      <article className={classnames('container', styles.MainWrapper)}>
        <div className={styles.ImageContent}>
          <img src={img} alt="Home page splash" />
        </div>
        <div className={classnames('content', styles.content)}>
          <h2 className="is-size-2">
            {header}
            <Emoji Emoji={emoji} Label={emojiLabel} />
          </h2>
          <p className="is-size-5">{paragraph1}</p>
          <p className="is-size-5">{paragraph2}</p>
        </div>
      </article>
    </section>
  );
};

export default TextPhotoBlockReversed;
