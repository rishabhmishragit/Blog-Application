import { createContext, useState } from "react";

// creating context api
export const SignInStatusContext = createContext();

// creting context api wrapper to wrap child components
const SignInContextWrapper = (props) => {
  // declaring state for login status
  const [SignInStatus, setSignInStatus] = useState(undefined);

  return (
    // passing login state getter and setter as context value
    <SignInStatusContext.Provider value={[SignInStatus, setSignInStatus]}>
      {/* wrapping up child components */}
      {props.children}
    </SignInStatusContext.Provider>
  );
};

export default SignInContextWrapper;
