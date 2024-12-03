import React, { useContext, useEffect, useState } from "react";
import { SignInStatusContext } from "../../contexts/SignInContext";

const Navbar = () => {
  const [isAuth, setIsAuth] = useContext(SignInStatusContext);

  useEffect(() => {
    const token = localStorage.getItem("blogToken");
    if (token) {
      setIsAuth(token);
    }
  }, [setIsAuth]);

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed w-full">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <a href="/" className="text-xl font-bold">
          Home
        </a>
        <div className="flex space-x-6">
          {/* <a href="/" className="hover:text-gray-400 transition duration-300">
            Home
          </a> */}
          {isAuth ? (
            <>
              <a
                href="/my-blogs"
                className="hover:text-gray-400 transition duration-300"
              >
                My Blogs
              </a>
              <p
                className="hover:text-gray-400 transition duration-300 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("blogToken");
                  window.location.href = "/";
                }}
              >
                LogOut
              </p>
            </>
          ) : (
            <>
              <a
                href="/sign-in"
                className="hover:text-gray-400 transition duration-300"
              >
                Sign In
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
