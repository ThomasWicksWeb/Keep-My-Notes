import React from 'react';
import 'bulma-pageloader';

const Loading = () => {
  return (
    <div className="LoaderFade">
      <div className="pageloader is-info is-active">
        <span className="title is-size-3 has-text-weight-bold has-text-centered">
          App Loading,
          <br />
          <span className="is-size-4 has-text-weight-bold">
            You'll be ready to go in just a moment!
          </span>
        </span>
      </div>
    </div>
  );
};

export default Loading;
