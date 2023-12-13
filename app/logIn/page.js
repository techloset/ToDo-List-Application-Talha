"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../firebase/auth";
import { auth } from "../firebase/config";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authUser } = useAuth();
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser]);

  const handleSignIn = async () => {
    if (!email || !password) return;

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    // Password validation
    const hasTwoCapitalLetters = (password.match(/[A-Z]/g) || []).length >= 2;
    if (!hasTwoCapitalLetters) {
      setError("Password must contain at least two capital letters.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // console.log("User signed up:", user);

      setEmail("");
      setPassword("");
      setError(null);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.errorCode;
      console.log(errorMessage);
      setError(errorMessage);

      // Handle specific error cases
      switch (errorCode) {
        // ...
        case "auth/invalid-credential":
          setError("Invalid password. Please try again.");
          break;
        // ...
      }

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
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
          />
          <p className="text-red-500 text-sm mt-2">{error}</p>
          <button
            onClick={handleSignIn}
            className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
          >
            Sign In
          </button>
        </form>

        <p className=" mt-6 text-white">
          Dont have an account?
          <Link href="/register">
            <span className="text-sky-400"> Sign up Here</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
