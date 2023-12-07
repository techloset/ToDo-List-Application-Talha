"use client";
import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword,  updateProfile, } from "firebase/auth";
import Link from "next/link";

const SignUp = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    if (!email || !password || !username) return;  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
    });
      const user = userCredential.user;
      console.log("User signed up:", user);
      // sessionStorage.setItem('user',true)
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      console.error("Error signing up:", errorCode, errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">SignUp</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="abc@gmail.com"
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

          <p className="text-red-500 text-sm mt-2">{error}</p>

          <button
            onClick={handleSignUp}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-white mt-6">
          Already have an account?{" "}
          <Link href="/signnIn">
            <span className="text-sky-400">Login Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
