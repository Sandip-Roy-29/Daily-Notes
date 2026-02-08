function NoteItem({ note }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <h3 className="text-lg font-semibold">{note.title}</h3>

      <ul className="mt-2 space-y-1 text-sm text-gray-700">
        {note.content.map((item) => (
          <li key={item._id} className="list-disc ml-4">
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteItem;
