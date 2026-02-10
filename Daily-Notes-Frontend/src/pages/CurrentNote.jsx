import { useCurrentNote } from "../hooks/useCurrentNote";
import NoteItem from "../components/NoteItem";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";

function CurrentNote(){
    const { noteId } = useParams();
    const { 
        currentNote,
        loading,
        error,
        fetchCurrentNote
     } = useCurrentNote();

    useEffect(() => {
        console.log(noteId);
        
        fetchCurrentNote(noteId);
    },[noteId, fetchCurrentNote]);

    if (loading) return <p>Loading note...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!currentNote) return <p>Note not found</p>;

    return(
        <div>
            <header>
            <h2>{currentNote.title}</h2>
            <Link to={`/notes/${noteId}/edit-title`}>Edit title</Link>
            </header>
            <NoteItem note={currentNote}/>
            <Link to={`/notes/${noteId}/add-content`}>Add content</Link>
        </div>
    )
}

export default CurrentNote;