import React from 'react';
import classnames from 'classnames';
import Emoji from '../../../components/Emoji';
import styles from './TextPhotoBlock.module.scss';

const TextPhotoBlock = ({
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
        <div className={classnames('content', styles.content)}>
          <h2 className="is-size-2">
            {header} <Emoji Emoji={emoji} Label={emojiLabel} />
          </h2>
          <p className="is-size-5">{paragraph1}</p>
          <p className="is-size-5">{paragraph2}</p>
        </div>
        <div className={styles.ImageContent}>
          <img src={img} alt="Home page splash" />
        </div>
      </article>
    </section>
  );
};

export default TextPhotoBlock;
