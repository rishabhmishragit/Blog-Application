import React from "react";
import { useNavigate } from "react-router-dom";

const BlogPostCard = ({ id, title, author, description, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/bloginfo/${id}`);
  };

  return (
    <div className="bg-white w-80 shadow-lg rounded-lg ">
      <img src={image} alt="Image" className="h-48 object-cover m-auto" />

      <div className="p-4 flex justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{author}</span>
          </div>
        </div>
        <div className="content-end">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white font-bold p-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;
