import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BlogForm from "../components/blog/BlogForm";
import { createBlog } from "../services/blogService";
import type { CreateBlogInput } from "../types/blog.types";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleCreate(data: CreateBlogInput) {
    try {
      setLoading(true);

      console.log(data);
      const newBlog = await createBlog(data);
      console.log("hello")
      navigate(`/blog/${newBlog.id}`);
    } catch (error) {
      console.error("Create blog failed:", error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create Blog</h1>
        <BlogForm onSubmit={handleCreate} loading={loading} />
      </div>

      <Footer />
    </>
  );
}