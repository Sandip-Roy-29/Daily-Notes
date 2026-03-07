import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { useAuth } from "../hooks/useAuth";
import { createNotes } from "../api/note.api";
import NoteList from "../components/notes/NoteList";
import NotesSkeleton from "../components/notes/NotesSkeleton";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { Plus, FileText, Sparkles } from "lucide-react";

function Dashboard() {
  const { user } = useAuth();
  const { notes, loading, error } = useNotes();
  const navigate = useNavigate();
  
  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Create note state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [createError, setCreateError] = useState("");
  const [createLoading, setCreateLoading] = useState(false);

  // Handle Create Note
  const handleCreateNote = async (e) => {
    e.preventDefault();
    setCreateError("");

    // Validation
    if (!content.trim()) {
      setCreateError("Content is required");
      return;
    }

    try {
      setCreateLoading(true);
      await createNotes({
        title: title.trim() || undefined,
        content: content,
      });

      // Reset form
      setTitle("");
      setContent("");
      setIsCreateModalOpen(false);
      
      // Refresh page to show new note
      window.location.reload();
    } catch (err) {
      setCreateError(err.response?.data?.message || "Failed to create note");
    } finally {
      setCreateLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-black py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <div className="h-8 bg-gray-800 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded w-64 animate-pulse"></div>
          </div>
          <NotesSkeleton />
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{error}</div>
          <Button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {user?.username}!
              </h1>
              <Sparkles size={24} className="text-yellow-500" />
            </div>
            <p className="text-gray-400">
              {notes && notes.length > 0
                ? `You have ${notes.length} note${notes.length === 1 ? "" : "s"}`
                : "Start by creating your first note"}
            </p>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 justify-center px-6 py-3"
          >
            <Plus size={18} />
            New Note
          </Button>
        </div>

        {/* Notes List or Empty State */}
        {notes && notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map((note) => (
              <div 
                key={note._id}
                onClick={() => navigate(`/notes/${note._id}`)}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {note.title || "Untitled"}
                    </h3>

                    <ul className="space-y-2">
                      {note.content?.slice(0, 3).map((item) => (
                        <li key={item._id} className="flex items-start gap-2 text-gray-400">
                          <span className="text-blue-500 mt-1.5">•</span>
                          <span className="flex-1">{item.text}</span>
                        </li>
                      ))}
                      {note.content?.length > 3 && (
                        <li className="text-gray-500 text-sm ml-4">
                          +{note.content.length - 3} more items...
                        </li>
                      )}
                    </ul>

                    <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                      <span>
                        {note.content?.length || 0} item{note.content?.length === 1 ? "" : "s"}
                      </span>
                      <span>•</span>
                      <span>
                        Updated {new Date(note.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-600/20 border border-blue-600/30 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-900 border-2 border-gray-800 rounded-2xl flex items-center justify-center mb-6">
              <FileText size={40} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              No notes yet
            </h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Create your first note to start organizing your thoughts and ideas.
            </p>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 px-6 py-3"
            >
              <Plus size={18} />
              Create Your First Note
            </Button>
          </div>
        )}

      </div>

      {/* Create Note Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setTitle("");
          setContent("");
          setCreateError("");
        }}
        title="Create New Note"
      >
        <form onSubmit={handleCreateNote} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={8}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Use line breaks to create multiple content blocks
            </p>
          </div>

          {createError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
              {createError}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              loading={createLoading}
              disabled={createLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {createLoading ? "Creating..." : "Create Note"}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsCreateModalOpen(false);
                setTitle("");
                setContent("");
                setCreateError("");
              }}
              className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Dashboard;