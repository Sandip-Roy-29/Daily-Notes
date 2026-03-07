import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCurrentNote } from "../hooks/useCurrentNote";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Loader from "../components/ui/Loader";
import { ArrowLeft, Edit2, Trash2, Plus, Save, AlertTriangle } from "lucide-react";

function NoteDetail() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const {
    currentNote,
    loading,
    error,
    fetchCurrentNote,
    updateTitle,
    addNoteContent,
    updateNoteContent,
    removeNoteContent,
    deleteCurrentNote,
  } = useCurrentNote();

  // Title Edit State
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  // Content States
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [contentError, setContentError] = useState("");

  // Edit Content State
  const [editingContentId, setEditingContentId] = useState(null);
  const [editContentText, setEditContentText] = useState("");

  // Delete States
  const [showDeleteNoteModal, setShowDeleteNoteModal] = useState(false);
  const [showDeleteContentModal, setShowDeleteContentModal] = useState(false);
  const [contentToDelete, setContentToDelete] = useState(null);

  // Initial fetch - only runs once when noteId changes
  useEffect(() => {
    const controller = new AbortController();
    fetchCurrentNote(noteId, controller.signal);

    return () => controller.abort();
  }, [noteId, fetchCurrentNote]);

  // Handle Title Update
  const handleUpdateTitle = async () => {
    setTitleError("");

    if (!newTitle.trim()) {
      setTitleError("Title cannot be empty");
      return;
    }

    if (newTitle === currentNote?.title) {
      setIsEditingTitle(false);
      return;
    }

    await updateTitle(noteId, newTitle.trim());
    setIsEditingTitle(false);
  };

  // Handle Add Content
  const handleAddContent = async () => {
    setContentError("");

    if (!newContent.trim()) {
      setContentError("Content cannot be empty");
      return;
    }

    await addNoteContent(noteId, newContent.trim());
    setNewContent("");
    setIsAddingContent(false);
  };

  // Handle Edit Content
  const handleEditContent = async (contentId) => {
    if (!editContentText.trim()) {
      return;
    }

    await updateNoteContent(noteId, contentId, editContentText.trim());
    setEditingContentId(null);
    setEditContentText("");
  };

  // Handle Delete Content
  const handleDeleteContent = async () => {
    if (!contentToDelete) return;

    await removeNoteContent(noteId, contentToDelete);
    setShowDeleteContentModal(false);
    setContentToDelete(null);
  };

  // Handle Delete Note
  const handleDeleteNote = async () => {
    await deleteCurrentNote(noteId);
    setShowDeleteNoteModal(false);
    navigate("/dashboard");
  };

  // Start editing title - set initial value from current note
  const startEditingTitle = () => {
    setIsEditingTitle(true);
    setNewTitle(currentNote?.title || "");
    setTitleError("");
  };

  // Start editing content - set initial value
  const startEditingContent = (contentId, text) => {
    setEditingContentId(contentId);
    setEditContentText(text);
  };

  // Loading State (initial load)
  if (loading && !currentNote) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Error State
  if (error && !currentNote) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => navigate("/dashboard")} className="bg-blue-600 hover:bg-blue-700">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // No Note State
  if (!loading && !currentNote) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Note not found</p>
          <Button onClick={() => navigate("/dashboard")} className="bg-blue-600 hover:bg-blue-700">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          <Button
            onClick={() => setShowDeleteNoteModal(true)}
            className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
          >
            <Trash2 size={18} />
            Delete Note
          </Button>
        </div>

        {/* Title Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          {!isEditingTitle ? (
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">
                {currentNote.title || "Untitled"}
              </h1>
              <button
                onClick={startEditingTitle}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-2 transition-colors"
              >
                <Edit2 size={18} />
                Edit Title
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter note title"
                autoFocus
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-2xl font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {titleError && (
                <p className="text-sm text-red-400">{titleError}</p>
              )}
              <div className="flex gap-2">
                <Button
                  onClick={handleUpdateTitle}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setIsEditingTitle(false);
                    setNewTitle("");
                    setTitleError("");
                  }}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Content</h2>
            <Button
              onClick={() => setIsAddingContent(true)}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-sm px-4 py-2"
            >
              <Plus size={16} />
              Add Content
            </Button>
          </div>

          <div className="p-6">
            {/* Add Content Form */}
            {isAddingContent && (
              <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write your content here..."
                  rows={4}
                  autoFocus
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-3"
                />
                {contentError && (
                  <p className="text-sm text-red-400 mb-3">{contentError}</p>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddContent}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingContent(false);
                      setNewContent("");
                      setContentError("");
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Content List */}
            {currentNote.content && currentNote.content.length > 0 ? (
              <div className="space-y-3">
                {currentNote.content.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                  >
                    {editingContentId === item._id ? (
                      // Edit Mode
                      <div className="space-y-3">
                        <textarea
                          value={editContentText}
                          onChange={(e) => setEditContentText(e.target.value)}
                          rows={3}
                          autoFocus
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleEditContent(item._id)}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 text-sm px-4 py-2"
                          >
                            <Save size={16} />
                            Save
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingContentId(null);
                              setEditContentText("");
                            }}
                            className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-sm px-4 py-2"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <span className="text-blue-400 mt-1">•</span>
                          <p className="text-gray-300 flex-1">{item.text}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => startEditingContent(item._id, item.text)}
                            className="text-blue-400 hover:text-blue-300 transition-colors p-2"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              setContentToDelete(item._id);
                              setShowDeleteContentModal(true);
                            }}
                            className="text-red-400 hover:text-red-300 transition-colors p-2"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No content yet</p>
                <Button
                  onClick={() => setIsAddingContent(true)}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 mx-auto"
                >
                  <Plus size={18} />
                  Add Your First Content
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-6 text-sm text-gray-500 flex items-center gap-4">
          <span>
            Created: {new Date(currentNote.createdAt).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>
            Updated: {new Date(currentNote.updatedAt).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>
            {currentNote.content?.length || 0} item{currentNote.content?.length === 1 ? "" : "s"}
          </span>
        </div>

      </div>

      {/* Delete Note Confirmation Modal */}
      <Modal
        isOpen={showDeleteNoteModal}
        onClose={() => setShowDeleteNoteModal(false)}
        title="Delete Note"
      >
        <div className="space-y-4">
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
            <p className="text-red-400 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle size={18} />
              Warning!
            </p>
            <p className="text-sm text-red-300">
              This will permanently delete this note and all its content. This action cannot be undone.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleDeleteNote}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete Note
            </Button>
            <Button
              onClick={() => setShowDeleteNoteModal(false)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Content Confirmation Modal */}
      <Modal
        isOpen={showDeleteContentModal}
        onClose={() => {
          setShowDeleteContentModal(false);
          setContentToDelete(null);
        }}
        title="Delete Content"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Are you sure you want to delete this content item? This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleDeleteContent}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setShowDeleteContentModal(false);
                setContentToDelete(null);
              }}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NoteDetail;