function NotesSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="p-4 border rounded-lg shadow-sm animate-pulse"
        >
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
          <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}

export default NotesSkeleton;
