import NoteItem from "./NoteItem";

function NoteList({ notes }){
    if(!notes.length){
        return <p>No notes found</p>
    }

    return notes.map((note) => (
        <NoteItem key={note._id} note={note}/>
    ))
}

export default NoteList;