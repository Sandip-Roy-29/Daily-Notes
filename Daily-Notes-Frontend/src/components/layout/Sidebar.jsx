import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { FileText, Settings, LogOut } from "lucide-react";

function Sidebar({ onNavigate = () => {} }) {
  const location = useLocation();
  const { logout, actionLoading } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/dashboard", icon: FileText, label: "Dashboard" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const handleNavClick = () => {
    onNavigate();
  };

  return (
    <aside className="h-full bg-black border-r border-gray-800 flex flex-col overflow-y-auto">
      
      {/* Logo/Brand */}
      <div className="px-6 py-5 border-b border-gray-800">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          onClick={handleNavClick}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText size={18} className="text-white" />
          </div>
          <span className="text-white font-semibold text-lg whitespace-nowrap">Daily-Notes</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                active 
                  ? "bg-gray-900 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-gray-900/50"
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-800">
        <button
          onClick={logout}
          disabled={actionLoading}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-900/50 w-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut size={18} className="flex-shrink-0" />
          <span>{actionLoading ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;