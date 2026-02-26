import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BlogForm from "../components/blog/BlogForm";
import { getBlogById, updateBlog } from "../services/blogService";
import type { Blog } from "../types/blog.types";
import Loader from "../components/ui/Loader";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getBlogById(id)
      .then((data) => setBlog(data || null))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(data: any) {
    if (!id) return;
    await updateBlog(id, data);
    navigate(`/blog/${id}`);
  }

  if (loading) return <Loader />;
  if (!blog) return <p className="text-center mt-10">Blog not found</p>;

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

        <BlogForm initialData={blog} onSubmit={handleUpdate} />
      </div>

      <Footer />
    </>
  );
}