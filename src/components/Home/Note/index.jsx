import React from 'react'

const Note = ({Title, Body, DocumentID}) => {

    const handleEditNote = () => {
        console.log("handle edit note")
        return(
            <h1>HELLO WORLD</h1>
        )
    }


    return(
        <div className="box" onClick={handleEditNote}>
            <h1 className="is-size-4 has-text-weight-bold">{Title}</h1>
            <p className="is-size-5">{Body}</p>
        </div>
    )
}

export default Note;