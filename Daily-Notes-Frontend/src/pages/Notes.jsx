import LogoutButton from "../components/LogoutButton";
import { useNotes } from "../hooks/useNotes";
import NoteList from "../components/NoteList";
import NotesSkeleton from "../components/NotesSkeleton";

function Note(){
    const { notes, loading, error } = useNotes();

    if(loading) return <NotesSkeleton/>;
    if(error) return <p>{error}</p>;

    return(
        <div>
            <h1>My Notes</h1>
            <NoteList notes={notes} />     
            <LogoutButton/>
        </div>
    )
}

export default Note;