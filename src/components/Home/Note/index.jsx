import React, { useState } from 'react'
import 'firebase'

const Note = ({Title, Body, DocumentID, userID}) => {

    const [modal, setModal] = useState(false);

    const handleEditNote = () => {
        setModal(!modal);
        console.log(modal);

        
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