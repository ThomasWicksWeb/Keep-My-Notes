import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAuu4t_3W5SLjCoQAnvxCbPrJIjL-EYw8w",
    authDomain: "keepmynotes-f9ade.firebaseapp.com",
    databaseURL: "https://keepmynotes-f9ade.firebaseio.com",
    projectId: "keepmynotes-f9ade",
    storageBucket: "keepmynotes-f9ade.appspot.com",
    messagingSenderId: "550390801016",
    appId: "1:550390801016:web:4f55f59dc7d5060da6438d",
    measurementId: "G-QC7YZL9R8X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const db = firebase.firestore();
export const auth = firebase.auth();