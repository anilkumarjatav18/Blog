import type { Blog } from "../../types/blog.types";
import BlogCard from "./BlogCard";

type Props = {
  blogs: Blog[];
};

export default function BlogList({ blogs }: Props) {
  if (blogs.length === 0) {
    return <p className="text-center mt-10">No blogs found.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}