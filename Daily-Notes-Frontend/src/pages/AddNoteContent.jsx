import { useState } from "react";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { useNavigate, useParams } from "react-router-dom";

function AddNoteContent(){
    const {addNoteContent } = useCurrentNote();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");
    const { noteId } = useParams();
    const navigate = useNavigate();

    const handleAddNoteContent = async (e) => {
        e.preventDefault();

        if(!text.trim()){
            setError("Content is required");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await addNoteContent(noteId,text);
            navigate(`/notes/${noteId}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add content");
        } finally {
            setLoading(false);
        }
    }


    return(
        <div>
            <h2>Add Content</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={handleAddNoteContent}>
            <div>
                <textarea
                placeholder="Write your note..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                />
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Adding.." : "Add"}
            </button>
            </form>
        </div>
    )
}

export default AddNoteContent;