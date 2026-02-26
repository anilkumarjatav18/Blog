import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import BlogDetails from "../pages/BlogDetails";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import Register from "../pages/Register";
import Login from "../pages/Login";
import AuthGate from "../components/auth/AuthGet";
import MyBlogs from "../pages/MyBlog";

export default function App() {
    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route
                path="/*"
                element={
                    <AuthGate>
                        <Routes>
                            <Route path="/create" element={<CreateBlog />} />
                            <Route path="/edit/:id" element={<EditBlog />} />
                            <Route path="/my-blogs" element={<MyBlogs />} />
                        </Routes>
                    </AuthGate>
                }
            />
        </Routes>
    );
}