import { Card } from "../ui/Card";

function NoteItem({ note }) {
  return (
    <div>
      <Card>
        <h3 className="text-lg font-semibold">{note.title}</h3>

        <ul className="mt-2 space-y-1 text-sm text-gray-700">
          {note.content?.map((item) => (
            <li key={item._id} className="list-disc ml-4">
              {item.text}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default NoteItem;
