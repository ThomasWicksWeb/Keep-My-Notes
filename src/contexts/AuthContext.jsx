import React, { createContext, useState, useEffect } from 'react';
import firebase from 'firebase';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [userState, setAuthState] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setAuthState(user);
    });
  });

  return (
    <AuthContext.Provider value={{ userState }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
