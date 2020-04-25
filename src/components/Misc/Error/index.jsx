import React from 'react';

const ErrorMessage = ({ ErrorTitle, ErrorBody }) => {
  return (
    // <article className="message is-danger">
    //   <div className="message-header">
    //     <p>{ErrorTitle}</p>
    //   </div>
    //   <div className="message-body">
    //     {ErrorBody}
    //   </div>
    // </article>
    <article class="notification is-danger"><strong>{ErrorBody}. Please try again.</strong></article>
  );
};

export default ErrorMessage;
