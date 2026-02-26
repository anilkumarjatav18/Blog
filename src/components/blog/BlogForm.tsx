import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import type { Blog, CreateBlogInput } from "../../types/blog.types";

type Props = {
  initialData?: Blog;
  onSubmit: (data: CreateBlogInput) => void;
  loading?: boolean;
};

export default function BlogForm({
  initialData,
  onSubmit,
  loading = false,
}: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload: CreateBlogInput = {
      title,
      content,
      image: image || undefined,
    };
    onSubmit(payload);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      {/* Title */}
      <Input
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Author */}

      {/* Image URL */}
      <Input
        placeholder="Image URL (optional)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      {/* Content */}
      <textarea
        placeholder="Write your blog..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full border rounded-lg p-3 min-h-37.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Submit */}
      <Button type="submit">
        {loading ? "Saving..." : "Save Blog"}
      </Button>
    </form>
  );
}