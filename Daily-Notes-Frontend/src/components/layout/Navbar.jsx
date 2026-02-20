import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";

function Navbar() {
  const { user, logout, actionLoading } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
        
        {/* LEFT GROUP */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link to="/" className="text-white font-semibold text-lg hover:text-gray-300 transition-colors">
            Daily-Notes
          </Link>

          {/* Divider */}
          <div className="h-5 w-px bg-gray-700"></div>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm transition-colors ${
                isActive("/") 
                  ? "text-white font-medium" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Home
            </Link>

            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-sm transition-colors ${
                    isActive("/dashboard") 
                      ? "text-white font-medium" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>

                <Link 
                to="/settings" 
                className={`text-sm transition-colors ${
                  isActive("/settings") 
                    ? "text-white font-medium" 
                    : "text-gray-400 hover:text-white"
                }`}
                >
                Settings
                </Link>
              </>
            )}

          </div>
        </div>

        {/* RIGHT GROUP */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/auth">
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white text-sm px-4 py-1.5"
                >
                  Log in
                </Button>
              </Link>

              <Link to="/auth">
                <Button
                  variant="primary"
                  className="text-sm px-4 py-1.5"
                >
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={logout}
                disabled={actionLoading}
                variant="outline"
                className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white text-sm px-4 py-1.5"
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