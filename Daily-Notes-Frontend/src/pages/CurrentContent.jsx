import { useParams } from "react-router-dom";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { useEffect } from "react";

function CurrentContent() {
    const { currentNote, loading, error, fetchCurrentNote } = useCurrentNote();
    const { noteId } = useParams();

    useEffect(() => {
        fetchCurrentNote(noteId);
    },[noteId, fetchCurrentNote]);

    if (loading) return <p>Loading content...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    const contents = currentNote?.content;

    if (!contents || contents.length === 0)
        return <p>Content not found</p>;

    return (
        <div>
            {contents.map(item => (
                <div key={item._id}>
                    {item.text}
                </div>
            ))}
        </div>
    );
}

export default CurrentContent;