import { useState } from "react";
import { createNotes } from "../api/note.api";
import { useNavigate } from "react-router-dom";

function CreateNotes(){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const navigate = useNavigate();

    const handleCreateNotes = async (e) => {
        e.preventDefault();

        if(!title.trim() && !content.trim()){
            setError("All fields are required");
            return;
        };
        
        try {
            setLoading(true);
            setError("");
            await createNotes(
                {
                    title,
                    content
                }
            );
            navigate("/notes")
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create note");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <h2>Create Notes</h2>

            {error && <p style={{color: "red"}}>{error}</p>};

            <form onSubmit={handleCreateNotes}>
                <div>
                    <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                     />
                </div>
                <div>
                    <textarea
                    placeholder="Write your note..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    )
}

export default CreateNotes;