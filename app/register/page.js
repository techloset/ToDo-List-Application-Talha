"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { auth } from "../firebase/config";
import Loader from "../component/Loader";

const Page = () => {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { authUser,isLoading,setAuthUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [authUser,isLoading]);

  const handleSignUp = async () => {
    if (!email || !password || !username) return;

    // Password validation
    const hasTwoCapitalLetters = (password.match(/[A-Z]/g) || []).length >= 2;
    if (!hasTwoCapitalLetters) {
      setError("Password must contain at least two capital letters.");
      return;
    }
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("user sigup infoo", user);
      await updateProfile(auth.currentUser, {
        displayName: username,
      });

      setAuthUser({
        uid: user.uid,
        email: user.email,
        username,
    });

      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      const errorMessage = error.message;

      setError(errorMessage);
    }
  };

  return isLoading || (!isLoading && !!authUser) ? (
    <Loader/>
) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign Up</h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Enter Name"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          {/* <p>{error}</p> */}

          <p className="text-red-500 text-sm mt-2 mb-2">{error}</p>

          <button
            onClick={handleSignUp}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-white mt-6">
          Already have an account?{" "}
          <Link href="/logIn">
            <span className="text-sky-400">Login Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
