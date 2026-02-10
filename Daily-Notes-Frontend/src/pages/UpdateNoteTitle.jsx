import { useNavigate, useParams } from "react-router-dom";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { useEffect, useState } from "react";

function UpdateNoteTitle(){
    const { noteId } = useParams();
    const navigate = useNavigate();
    const { currentNote, updateTitle } = useCurrentNote();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [title,setTitle] = useState("");

    useEffect(() => {
        if(currentNote?.title) setTitle(currentNote.title);
    },[currentNote]);

    const handleUpdateNoteTitle = async (e) => {
        e.preventDefault();

        if(!title){
            setError("Title is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await updateTitle(noteId,title);
            navigate(`/notes/${noteId}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update title");
        } finally{
            setLoading(false);
        }
    }

    return(
        <div>
            <h2>Title update</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleUpdateNoteTitle}>
            <div>
                <input
                type="text"
                placeholder="Title"
                value={title}
                disabled={loading}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update"}
            </button>
            </form>
        </div>
    )
}

export default UpdateNoteTitle;