import { useEffect, useState } from "react";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { useNavigate, useParams } from "react-router-dom";

function UpdateContent(){
    const { updateNoteContent, currentNote, fetchCurrentNote } = useCurrentNote();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { noteId, contentId } = useParams();
    const [text, setText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(!currentNote || currentNote._id !== noteId){
            fetchCurrentNote(noteId);
        }
    },[noteId]);
    
    useEffect(() => {
        if(!currentNote?.content) return;

        const content = currentNote?.content?.find(item => item._id === contentId);
        
        if(content) setText(content.text);
    },[currentNote, contentId])
    console.log(text);
    

    const handleUpdateNoteContent = async (e) => {
        e.preventDefault();
        
        if(!text.trim()){
            setError("Content is required");
            return;
        }

        try {
            setError(null);
            setLoading(true);
            await updateNoteContent(noteId, contentId, text);
            navigate(`/notes/${noteId}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update content");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <h2>Update Content</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={handleUpdateNoteContent}>
            <div>
                <textarea
                placeholder="Write your note..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Updating.." : "Update"}
            </button>
            </form>
        </div>
    )
}

export default UpdateContent;