import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BlogList from "../components/blog/BlogList";
import Loader from "../components/ui/Loader";
import useBlogs from "../hooks/useBlogs";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { blogs } = useBlogs();
  const { user, loading } = useAuth();

  // wait for firebase
  if (loading) return <Loader />;

  // redirect if not logged in
  if (!user) return <Navigate to="/login" replace />

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

        {loading ? <Loader /> : <BlogList blogs={blogs} />}
      </div>

      <Footer />
    </>
  );
}