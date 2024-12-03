import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AllBlogsContext } from "../../contexts/AllBlogsContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";

const BlogInfo = ({ blogs }) => {
  const { id } = useParams();

  const [allBlogs, setAllBlogs] = useContext(AllBlogsContext);

  function getAllBlogs() {
    try {
      const q = query(collection(fireDB, "blogPost"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });

        setAllBlogs(blogArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);

  const blog = allBlogs.find((blog) => blog.id === id);

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-600">Blog not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow pt-28">
      <div className="mb-4">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-64 object-cover rounded"
        />
      </div>
      <h1 className="text-3xl font-bold mb-4 text-center">{blog.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      ></div>
    </div>
  );
};

export default BlogInfo;
