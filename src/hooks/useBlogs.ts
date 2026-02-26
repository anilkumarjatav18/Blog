import { useEffect, useState } from "react";
import type { Blog } from "../types/blog.types";
import { getBlogs } from "../services/blogService";

export default function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(setBlogs)
      .finally(() => setLoading(false));
  }, []);

  return { blogs, loading };
}