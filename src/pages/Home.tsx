import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BlogList from "../components/blog/BlogList";
import Loader from "../components/ui/Loader";
import useBlogs from "../hooks/useBlogs";


export default function Home() {
  const { blogs, loading } = useBlogs();


  // wait for firebase
  if (loading) return <Loader />;

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