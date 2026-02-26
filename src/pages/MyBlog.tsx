import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getBlogsByUser } from "../services/blogService";
import type { Blog } from "../types/blog.types";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Loader from "../components/ui/Loader";
import { Link } from "react-router-dom";

export default function MyBlogs() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getBlogsByUser(user.uid)
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="grow flex items-center justify-center bg-gray-50/50">
        <Loader />
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="grow py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                My Dashboard
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                You have published <span className="text-blue-600 font-semibold">{blogs.length}</span> {blogs.length === 1 ? 'story' : 'stories'}.
              </p>
            </div>

            <Link
              to="/create"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg shadow-blue-200 active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Write New Post
            </Link>
          </div>

          {blogs.length === 0 ? (
            /* Enhanced Empty State */
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="py-24 text-center px-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-6">
                  <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No posts yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-8">
                  Your creative journey starts here. Share your first story with the world today.
                </p>
                <Link
                  to="/create"
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl hover:bg-slate-800 transition-all font-medium"
                >
                  Create Your First Blog
                </Link>
              </div>
            </div>
          ) : (
            /* Modern Blog Grid */
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="group relative bg-white rounded-2xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 flex flex-col"
                >
                  {/* Floating Date Tag */}
                  <div className="absolute top-6 right-6">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                      {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mt-4 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                    {blog.content}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs font-semibold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      View Insights <span className="opacity-0 group-hover:opacity-100 transition-all">→</span>
                    </span>
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-400">
                        {blog.title[0]}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}