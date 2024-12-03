import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireDB, auth, storage } from "../../Firebase/FirebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
  });

  const [thumbnail, setThumbnail] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleEditorChange = (value) => {
    setBlogData({ ...blogData, description: value });
  };

  //* Upload Image Function
  const uploadImage = () => {
    // console.log(auth.currentUser, "kdjhkjfs");
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);
    uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productRef = collection(fireDB, "blogPost");
        try {
          addDoc(productRef, {
            ...blogData,
            author: {
              authorName: auth.currentUser.email,
              authorId: auth.currentUser.uid,
            },
            thumbnail: url,
            time: Timestamp.now(),
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
          });
          navigate("/");
          // toast.success('Post Added Successfully');
        } catch (error) {
          // toast.error(error)
          console.log(error);
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadImage();
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Blog Data Submitted:", blogData);

  //     // Handle form submission logic here (e.g., API call to save the blog post)
  //   };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Blog
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Image Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          {/* Description Editor */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description
            </label>
            <ReactQuill
              value={blogData.description}
              onChange={handleEditorChange}
              className="bg-white border rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
