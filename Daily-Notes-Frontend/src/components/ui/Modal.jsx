function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        
        {title && (
          <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;