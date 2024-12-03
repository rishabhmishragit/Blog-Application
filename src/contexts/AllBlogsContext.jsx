import { createContext, useState } from "react";

// creating context api
export const AllBlogsContext = createContext();

// creting context api wrapper to wrap child components
const AllBlogsContextWrapper = (props) => {
  // declaring state for login status
  const [allBlogs, setAllBlogs] = useState([]);

  return (
    // passing login state getter and setter as context value
    <AllBlogsContext.Provider value={[allBlogs, setAllBlogs]}>
      {/* wrapping up child components */}
      {props.children}
    </AllBlogsContext.Provider>
  );
};

export default AllBlogsContextWrapper;
