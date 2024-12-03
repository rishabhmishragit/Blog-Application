import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import CreateBlog from "./pages/createBlog/CreateBlog";
import Layout from "./components/layout/Layout";
import MyBlogs from "./pages/myBlogs/MyBlogs";
import BlogInfo from "./pages/blogInfo/BlogInfo";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/*" element={<NoPage />} /> */}
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
