import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/Validate";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const [isSignInForm, setisSignInForm] = useState(true);

  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);

    const errorMessage = checkValidData(
      email.current.value,
      password.current.value
      // name.current.value
    );
    setErrorMessage(errorMessage);
    if (errorMessage) return;

    // Sign In / Sign Up Logic

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/113358156?v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(errorMessage);
            });
          //  console.log(user);
          //  navigate("/browse"); // Navigate to browse page after login
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // const user = userCredential.user;
          // console.log(user);
          // navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  return (
    <div className="relative bg-gradient-to-b from-black min-h-screen">
      <Header />
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover" src={BG_URL} alt="logo" />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-4xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up "}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-sm"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />{" "}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />
        <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
        <button
          onClick={handleButtonClick}
          className="w-full bg-red-600 p-4 my-4 rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 text-xl cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? `New to Netflix? Sign Up Now`
            : "Already Registered? Sign in Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
