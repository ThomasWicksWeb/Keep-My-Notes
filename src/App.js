import React, { useEffect, useState } from 'react';
import { history } from 'react-router-dom'
import Login from './components/Login'

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";


function App() {


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("I'm logged in")
  } else {
    // No user is signed in.
    return (
      <Login />
    );
  }
});


// return (
//     <Login />
//   );
}

export default App;
