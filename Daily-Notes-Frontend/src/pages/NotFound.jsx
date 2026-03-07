import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, FileQuestion, Search } from "lucide-react";
import Button from "../components/ui/Button";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        
        {/* 404 Illustration */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Main circle with icon */}
            <div className="w-40 h-40 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-gray-800 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FileQuestion size={80} className="text-gray-600" />
            </div>
            
            {/* 404 Badge */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-xl shadow-red-500/20 border-4 border-black">
              404
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-600/30 rounded-full blur-sm"></div>
            <div className="absolute -top-2 left-8 w-6 h-6 bg-purple-600/30 rounded-full blur-sm"></div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Error Code */}
        <div className="inline-flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-10">
          <span className="text-sm text-gray-500">Error Code:</span>
          <span className="text-sm text-red-400 font-mono">404_NOT_FOUND</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/">
            <Button 
              variant="primary" 
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 px-6 py-3"
            >
              <Home size={18} />
              Go Home
            </Button>
          </Link>
          
            <Button 
              onClick={() => navigate(-1)}
              variant="outline" 
  className="w-full sm:w-auto bg-transparent border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white flex items-center justify-center gap-2 px-6 py-3"
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
        </div>

        {/* Helpful Links */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Search size={18} className="text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-300">
              Looking for something?
            </h3>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            <Link 
              to="/" 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-700">•</span>
            <Link 
              to="/dashboard" 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-700">•</span>
            <Link 
              to="/profile" 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Profile
            </Link>
            <span className="text-gray-700">•</span>
            <Link 
              to="/auth" 
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Footer Help Text */}
        <p className="text-sm text-gray-500 mt-8">
          Still having trouble?{" "}
          <a href="#" className="text-gray-400 hover:text-gray-300 underline">
            Contact support
          </a>
        </p>

      </div>
    </div>
  );
}

export default NotFound;