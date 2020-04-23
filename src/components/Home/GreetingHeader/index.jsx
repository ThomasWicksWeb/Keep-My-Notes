import React from 'react';

const GreetingHeader = ({ user }) => {
  return (
    <>
      <p className="has-text-weight-bold is-size-3">Good Afternoon, {user.email}!</p>
      <ul>
        <li className="is-size-5">User ID: {user.uid} </li>
      </ul>
    </>
  );
};

export default GreetingHeader;
