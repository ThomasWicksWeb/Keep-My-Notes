import React from 'react';

import {ExternalLink} from '../ExternalLink';

function AppFooter() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p className="is-size-6">
          <strong>Keep My Notes</strong> by{' '}
          <ExternalLink
            text="Thomas Wicks,"
            href="https://thomaswicks.com/"
            className="text-highlight hvr-sweep-to-right has-text-weight-bold"
          ></ExternalLink>{' '}
          created as a personal project
        </p>
        <p className="is-size-6">
          If you'd like to support this website, please consider my{' '}
          <ExternalLink
            text="Buy Me a Coffee"
            href="https://www.buymeacoffee.com/thomaswicks"
            className="is-size-6 hvr-sweep-to-right text-highlight has-text-weight-bold"
          ></ExternalLink>{' '}
          ☕ page. Thank you!{' '}
        </p>
        <p className="is-size-6">
          Curious about the code? Check out the{' '}
          <ExternalLink
            text="GitHub repository"
            href="https://github.com/ThomasWicksWeb/Keep-My-Notes-App"
            className="is-size-6 hvr-sweep-to-right text-highlight has-text-weight-bold"
          ></ExternalLink>{' '}
        </p>
        <p className="is-size-6">Site last updated <strong>May 26th, 2020</strong></p>
      </div>
    </footer>
  );
}

export default AppFooter;
