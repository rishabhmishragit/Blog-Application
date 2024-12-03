import React, { useEffect, useState, useContext } from "react";
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import { SignInStatusContext } from "../../contexts/SignInContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyBlogs = () => {
  const [isAuth] = useContext(SignInStatusContext);
  const [user, setUser] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [editBlogId, setEditBlogId] = useState(null);
  const [editContent, setEditContent] = useState({
    title: "",
    description: "",
  });

  function getAllBlogs() {
    try {
      const q = query(collection(fireDB, "blogPost"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let blogArray = [];
        QuerySnapshot.forEach((doc) => {
          blogArray.push({ ...doc.data(), id: doc.id });
        });

        setBlogs(blogArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, [editStatus]);

  //   const myBlogsData = allBlogs?.filter(
  //     (elem) => auth.currentUser.uid === elem.author.authorId
  //   );

  useEffect(() => {
    setMyBlogs(
      blogs?.filter((elem) => auth.currentUser.uid === elem.author.authorId)
    );
  }, [blogs]);

  useEffect(() => {
    if (auth.currentUser) {
      // Fetch logged-in user's info
      const fetchUserData = () => {
        const q = query(
          collection(fireDB, "users"),
          where("uid", "==", auth.currentUser.uid)
        );
        onSnapshot(q, (snapshot) => {
          snapshot.forEach((doc) => setUser(doc.data()));
        });
      };

      // Fetch user's blogs
      //   const fetchBlogs = () => {
      //     const q = query(
      //       collection(fireDB, "blogs"),
      //       where("uid", "==", auth.currentUser.uid)
      //     );
      //     onSnapshot(q, (snapshot) => {
      //       const blogsList = [];
      //       snapshot.forEach((doc) =>
      //         blogsList.push({ id: doc.id, ...doc.data() })
      //       );
      //       setBlogs(blogsList);
      //     });
      //   };

      fetchUserData();
      //   fetchBlogs();
    }
  }, [isAuth]);

  // Delete a blog
  const handleDelete = async (blogId) => {
    try {
      await deleteDoc(doc(fireDB, "blogPost", blogId));
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Start editing a blog
  const handleEdit = (blog) => {
    setEditBlogId(blog.id);
    setEditContent({
      title: blog.title,
      description: blog.description,
    });
  };

  // Save edited blog
  const saveEdit = async () => {
    try {
      await updateDoc(doc(fireDB, "blogPost", editBlogId), editContent);
      setBlogs(
        blogs.map((blog) =>
          blog.id === editBlogId ? { ...blog, ...editContent } : blog
        )
      );
      setEditBlogId(null);
      setEditContent({ title: "", description: "" });
      setEditStatus(!editStatus);
      alert("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  if (!auth.currentUser) {
    return <p>Please log in to view your blogs.</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 pt-24">
      <div className="flex bg-white p-6 rounded-lg shadow-md mb-8 justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Welcome</h2>
        </div>
        <div>
          <a href="/create-blog">
            <button className="bg-blue-600 text-white font-bold p-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Create Blog
            </button>
          </a>
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4 ml-2">My Blogs List</h3>
      <table className="table-auto w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {myBlogs.length ? (
            myBlogs.map((blog) => (
              <tr key={blog.id} className="border-t">
                <td className="border-gray border-2 px-4 py-2 text-center w-1/4 font-bold content-start">
                  {editBlogId === blog.id ? (
                    <input
                      type="text"
                      value={editContent.title}
                      onChange={(e) =>
                        setEditContent({
                          ...editContent,
                          title: e.target.value,
                        })
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    blog.title
                  )}
                </td>
                <td className="px-4 py-2 border-gray border-2">
                  {editBlogId === blog.id ? (
                    <ReactQuill
                      value={editContent.description}
                      onChange={(value) =>
                        setEditContent({ ...editContent, description: value })
                      }
                      className="border p-2 w-full rounded"
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: blog.description,
                      }}
                    />
                  )}
                </td>
                <td className="border-gray border-2 px-4 py-2 text-center w-1/6 content-start">
                  {editBlogId === blog.id ? (
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(blog)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className=" text-center  m-10">
              <td colSpan={3}>
                <p className="m-10">No Blogs</p>
              </td>{" "}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyBlogs;
