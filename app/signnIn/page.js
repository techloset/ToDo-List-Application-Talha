"use client";
import { useEffect, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
// import { useRouter } from "next/router";
import { auth } from "../firebase/config";
// import { useAuth } from "../firebase/auth";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
// const {authUser,isLoading} = useAuth()




//   const router = useRouter();


//   useEffect(() => {
//    if (!isLoading && authUser) {
//     router.push('/')
//    }
//   }, [authUser,isLoading])
  

  const handleSignIn = async () => {
    if (!email || !password) return;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User signed up:", user);
      // sessionStorage.setItem("user", true);
      setEmail("");
      setPassword("");
      // router.push("/");

    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <button
            onClick={handleSignIn}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            Sign In
          </button>
        </form>

        <p className=" mt-6 text-white">
          Don't have an account?
          <Link href="/signUp">
            <span className="text-sky-400"> Sign up Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
