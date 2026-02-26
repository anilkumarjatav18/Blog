import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutUser } from "../../services/authService";

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  // Helper to highlight active link
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform">
              B
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-linaer-to-r from-white to-slate-400">
              Blog<span className="text-blue-500">App</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-1 items-center">
            {user ? (
              <>
                <Link
                  to="/my-blogs"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/my-blogs')
                    ? 'text-white bg-slate-800'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  My Library
                </Link>

                <div className="h-4 w-1px bg-slate-700 mx-2 hidden sm:block" />

                <Link
                  to="/create"
                  className="hidden sm:flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create
                </Link>

                <button
                  onClick={logoutUser}
                  className="ml-2 p-2 text-slate-400 hover:text-red-400 transition-colors rounded-full hover:bg-red-400/10"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white px-3 py-2"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-md active:scale-95"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}