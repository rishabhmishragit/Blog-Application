import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignUp({ ...userSignUp, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignUp.email,
        userSignUp.password
      );

      // create user object
      const user = {
        name: userSignUp.name,
        email: users.user.email,
        uid: users.user.uid,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user reference
      const userReference = collection(fireDB, "user");

      // Add user detail
      addDoc(userReference, user);

      setUserSignUp({
        name: "",
        email: "",
        password: "",
      });

      alert("User Created, You can SignIn now.");

      navigate("/sign-in");
    } catch (error) {
      alert(error);
      console.log(error);
    }

    // console.log("Form Submitted:", userSignUp);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userSignUp.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userSignUp.email}
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
              value={userSignUp.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className=" text-gray-600 text-center mt-3">
          Already have an acount?&nbsp;{" "}
          <a href="/sign-in" className="text-blue-600">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
