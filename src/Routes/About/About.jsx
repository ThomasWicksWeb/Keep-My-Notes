import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './About.module.scss';

const About = () => {
  return (
    <main>
      <Helmet>
        <title>About | Keep My Notes</title>
      </Helmet>
      <section className="section">
        <div className="container content">
          <h3 className="has-text-weight-bold is-size-3">
            Thank you for taking the time to check out <em>Keep My Notes</em>!
          </h3>
          {/* <h2 className="has-text-weight-bold is-size-4">
            So what exactly is <em>'Keep My Notes'</em>?
          </h2> */}
          <hr />
          <div className={styles.paragraphs}>
            <p className="is-size-5">Hey There!</p>
            <p className="is-size-6">
              <em>Keep My Notes</em> was created as a personal project by
              myself, Thomas Wicks.
            </p>
            <p className="is-size-6">
              My main goal with this project was to jump into furthering my
              React skills with my most technically abitious project yet, and I
              also really wanted to create a project that incorporated some sort
              of database -- since everything I've created up until this point
              has been static.
            </p>
            <p className="is-size-6">
              I chose Google Firebase as my back-end poison of choice, and
              coupled with React, I got down to coding!
            </p>
            <p className="is-size-6">
              The learning experience that this project has presented has been
              phenominal to my growth as a web developer. I was able to learn
              and incorporate Firebase authentication and the Firestore -- both
              of which I've been eager to put into a project for a while now, as
              well as learn more about how React works than I initially thought
              I would have.
            </p>
            <p className="is-size-6">
              Thank you again for taking the time to check out{' '}
              <em>Keep My Notes</em>, I truly hope you like what I've created
              here!
            </p>
            <p className="is-size-5">
              All the best,
              <br />
              Thomas Wicks
            </p>
            <hr />
            <p className="is-size-6">
              <strong>Disclaimer:</strong> This project is definitely not
              fool-proof. It should function perfectly fine under normal usage,
              but this web app should be seen as a personal project by an
              individual, not a production-ready note application with the
              absolute minimal chance of app-breaking bugs appearing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
