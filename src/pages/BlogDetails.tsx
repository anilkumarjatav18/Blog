import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Blog } from "../types/blog.types";
import { getBlogById } from "../services/blogService";
import Loader from "../components/ui/Loader";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function BlogDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getBlogById(id)
      .then((data) => setBlog(data || null))
      .finally(() => setLoading(false));
  }, [id]);

  const isOwner = user?.uid === blog?.authorId;

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="grow flex items-center justify-center">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="grow flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Post Missing</h2>
            <p className="text-slate-500 mb-8">This blog post has either been moved or deleted.</p>
            <Link to="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Return to Feed
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="grow">
        {/* Hero Section */}
        <header className="relative py-16 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="group flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Back to articles
              </Link>

              {isOwner && (
                <Link to={`/edit/${blog.id}`} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-all shadow-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  Edit Article
                </Link>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              {blog.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-inner">
                {blog.author?.[0] || "U"}
              </div>
              <div>
                <p className="text-slate-900 font-semibold">{blog.author || "Anonymous"}</p>
                <p className="text-slate-500 text-sm">
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    month: "long", day: "numeric", year: "numeric"
                  })} • 6 min read
                </p>
              </div>
            </div>
          </div>
        </header>


        <div className="max-w-4xl mx-auto px-6 py-12">
          {blog.image && (
            <div>
              {blog.image && (
                <div className="mb-12">
                  <div className="relative w-full overflow-hidden rounded-3xl shadow-2xl shadow-slate-200 bg-slate-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      /* aspect-video sets a 16:9 ratio. 
                         object-cover ensures the image fills the area without stretching.
                      */
                      className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <article className="relative">
            {/* Share Sidebar (Visible on Desktop) */}


            <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>

            <footer className="mt-16 pt-8 border-t border-slate-200">
              <div className="bg-blue-50 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Enjoyed this article?</h3>
                <p className="text-slate-600 mb-6">Join our newsletter to get the latest posts delivered straight to your inbox.</p>
                <div className="flex max-w-md mx-auto gap-2">
                  <input type="email" placeholder="Email address" className="grow px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Subscribe</button>
                </div>
              </div>
            </footer>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}