import { useState } from "react";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { useNavigate, useParams } from "react-router-dom";

function DeleteNoteButton(){
    const { deleteCurrentNote } = useCurrentNote();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const { noteId } = useParams();
    const navigate = useNavigate();
    
    const handleDeleteNote = async (e) => {
        e.preventDefault();
        
        const confirmed = window.confirm("Are you sure you want to delete this note?");
        if(!confirmed) return;

        try {
            setLoading(true);
            setError(null);
            await deleteCurrentNote(noteId);
            navigate("/notes");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete note");
        } finally {
            setLoading(false)
        }
    }


    return(
        <div>
        {error && <p style={{color:"red"}}>{error}</p>};
        <button onClick={handleDeleteNote} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
        </button>
        </div>
    )
}

export default DeleteNoteButton;