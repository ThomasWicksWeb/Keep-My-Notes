import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { db } from '../../../firebase';

const Note = ({Title, Body, DocumentID, userID}) => {

    const [modal, setModal] = useState(false);
    const [user, setUser] = useState("");
    


    useEffect( () => {
        // setUser will take the whole user object. not point in storing mail and id separately :)
        firebase.auth().onAuthStateChanged(user => {
            // const { uid } = user;
            console.log("check rerender from user auth() useEffect in <Note />");
            setUser(user);
        }); 
    }, []);

    async function handleEditNote() {
        // setModal(!modal);
        // console.log(modal);
        // db.collection("testCollection").where("capital", "==", true);
        // const snapshot = await db.collection('testCollection').doc(user.uid).collection('Notes').where(DocumentID, "==", DocumentID).get()
        // const storedNotes = await Promise.all(snapshot.docs.map(async doc => await doc.data()));

        // console.log(storedNotes);

        db.collection('testCollection').doc(user.uid).collection('Notes').doc(DocumentID).update({
            content: "This is new content!333!!!"
        })

    }


    return(
        <div className="box">
            <h1 className="is-size-4 has-text-weight-bold">{Title}</h1>
            <p className="is-size-5">{Body}</p>
            <button onClick={handleEditNote}>Edit</button>
        </div>
    )
}

export default Note;