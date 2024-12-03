import React, { useContext, useEffect, useState } from "react";
import BlogPostCard from "../../components/blogPostCard/BlogPostCard";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import { AllBlogsContext } from "../../contexts/AllBlogsContext";
import Pagination from "../../components/pagination/Pagination";

const Home = () => {
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

  const itemsPerPage = 8;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const lastProductIndex = currentPage * itemsPerPage;
  const firstProductIndex = lastProductIndex - itemsPerPage;

  const Items = allBlogs.slice(firstProductIndex, lastProductIndex);
  return (
    <>
      <div className="w-11/12 grid grid-cols-4 gap-4 m-auto pt-28 pb-8">
        {allBlogs.map((elem, i) => {
          return (
            <BlogPostCard
              key={elem.id}
              id={elem.id}
              image={elem.thumbnail}
              title={elem.title}
              description={elem.description}
              author={elem.author.authorName}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(allBlogs.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Home;
