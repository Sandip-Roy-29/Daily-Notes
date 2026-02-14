import EmptyState from "../ui/EmptyState";
import NoteItem from "./NoteItem";

function NoteList({ notes }) {
  if (!notes || notes.length === 0) {
    return <EmptyState title="No Notes Found" />;
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
}

export default NoteList;
