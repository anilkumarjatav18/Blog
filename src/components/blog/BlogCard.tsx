import type { Blog } from "../../types/blog.types";
import { Link } from "react-router-dom";

type Props = {
  blog: Blog;
};

export default function BlogCard({ blog }: Props) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10 border border-slate-100">
      {/* Decorative background element */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-50 transition-transform group-hover:scale-150" />

      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
            Article
          </span>
          <span className="text-xs text-slate-400">5 min read</span>
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
          {blog.title}
        </h2>
      </div>

      <div className="relative flex items-center justify-between border-t border-slate-50 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-linear-to-tr from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
            {blog.author}
          </div>
          <p className="text-sm font-medium text-slate-700">{blog.author}</p>
        </div>

        <Link
          to={`/blog/${blog.id}`}
          className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700"
        >
          Read Post
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}