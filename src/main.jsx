import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import SignInContextWrapper from "./contexts/SignInContext.jsx";
import AllBlogsContextWrapper from "./contexts/AllBlogsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SignInContextWrapper>
      <AllBlogsContextWrapper>
        <App />
      </AllBlogsContextWrapper>
    </SignInContextWrapper>
  </StrictMode>
);
