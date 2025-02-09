import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Layout({ children }) {
  return (
    <div>
      {/* Navbar  */}
      <Navbar />
      {/* main Content  */}
      <div>{children}</div>
      {/* Footer  */}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
