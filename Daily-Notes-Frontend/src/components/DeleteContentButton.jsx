import { useEffect, useState } from "react";
import { useCurrentNote } from "../hooks/useCurrentNote";
import { useNavigate, useParams } from "react-router-dom";

function DeleteContentButton() {
  const { removeNoteContent, currentNote, fetchCurrentNote } = useCurrentNote();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { noteId, contentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  if (!currentNote || currentNote._id !== noteId) {
    fetchCurrentNote(noteId);
  }
}, [noteId, currentNote, fetchCurrentNote]);


  const handleDeleteNoteContent = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);
      await removeNoteContent(noteId, contentId);
      navigate(`/notes/${noteId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleDeleteNoteContent} disabled={loading}>
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export default DeleteContentButton;