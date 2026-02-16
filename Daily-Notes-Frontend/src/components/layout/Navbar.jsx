import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";

function Navbar() {
  const { user, logout, actionLoading } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-black border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto h-12 px-6 flex items-center justify-between">
        
        {/* LEFT GROUP */}
        <div className="flex items-center gap-8">
          {/* Logo - separate from nav links */}
          <Link to="/" className="text-white font-medium text-sm">
            Daily-Notes
          </Link>

          {/* Divider */}
          <div className="h-4 w-px bg-gray-800"></div>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${isActive("/") ? "text-white" : "text-gray-400 hover:text-white"}`}
            >
              Home
            </Link>

            {user && (
              <Link 
                to="/notes" 
              className={`text-sm transition-colors ${isActive("/") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                Notes
              </Link>
            )}
          </div>
        </div>

        {/* RIGHT GROUP */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link 
                to="/login" 
              className={`text-sm transition-colors ${isActive("/") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                Log in
              </Link>

              <Link
                to="/register"
              className={`text-sm transition-colors ${isActive("/") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/profile" 
              className={`text-sm transition-colors ${isActive("/") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                Profile
              </Link>

              <Button
                onClick={logout}
                disabled={actionLoading}
              className={`text-sm transition-colors ${isActive("/") ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {actionLoading ? "Logging out..." : "Logout"}
              </Button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;