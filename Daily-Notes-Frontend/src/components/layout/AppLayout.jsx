import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

function AppLayout(){
    const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth >= 768);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    // Handle window resize - single effect to avoid cascading renders
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            // Auto-close sidebar on mobile, auto-open on desktop
            setSidebarOpen(!mobile);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen flex bg-black">
            {/* Mobile/Tablet Toggle Button - Only show on mobile when sidebar is closed */}
            {isMobile && !sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-gray-900 border border-gray-800 hover:bg-gray-800 transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <Menu size={24} className="text-white" />
                </button>
            )}

            {/* Overlay for mobile when sidebar is open */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Full width on desktop, Overlay on mobile */}
            <div
                className={`fixed md:static inset-y-0 left-0 z-40 w-64 transition-all duration-300 ease-in-out ${
                    isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
                }`}
            >
                {/* Always show full sidebar (no collapse) */}
                <Sidebar 
                    collapsed={false}
                    onNavigate={() => isMobile && setSidebarOpen(false)}
                    isMobile={isMobile}
                />
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-black transition-all duration-300">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout;