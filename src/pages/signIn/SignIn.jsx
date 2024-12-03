import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { SignInStatusContext } from "../../contexts/SignInContext";

const SignIn = () => {
  const [isAuth, setIsAuth] = useContext(SignInStatusContext);

  const navigate = useNavigate();
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignIn({ ...userSignIn, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userSignIn.email,
        userSignIn.password
      );

      const user = users.user;
      const token = user.accessToken;
      setIsAuth(token);
      localStorage.setItem("blogToken", token);

      try {
        const q = query(
          collection(fireDB, "users"),
          where("uid", "==", users.user.uid)
        );

        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;

          QuerySnapshot.forEach((doc) => (user = doc.data()));

          setUserSignIn({
            email: "",
            password: "",
          });

          navigate("/");

          return () => data;
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      alert("Invalid credentials");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userSignIn.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userSignIn.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className=" text-gray-600 text-center mt-3">
          Don't have an acount?&nbsp;{" "}
          <a href="/sign-up" className="text-blue-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
