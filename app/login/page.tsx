/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState(false);

  const buttonDisabled = !(user.email.length > 0 && user.password.length > 0);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);

      console.log("Login successful", response.data);

      toast.success("Login successful");

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);

      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-black">
          {loading ? "Processing..." : "Login"}
        </h1>

        <p className="text-gray-500 mb-6">Enter your credentials to continue</p>

        <label
          htmlFor="email"
          className="self-start mb-1 text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-4
          focus:outline-none focus:ring-2 focus:ring-blue-500
          focus:border-blue-500 text-black placeholder:text-gray-400
          shadow-sm transition-all"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
        />

        <label
          htmlFor="password"
          className="self-start mb-1 text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          className="w-full p-3 border border-gray-300 rounded-lg mb-6
          focus:outline-none focus:ring-2 focus:ring-blue-500
          focus:border-blue-500 text-black placeholder:text-gray-400
          shadow-sm transition-all"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
        />

        <button
          disabled={buttonDisabled || loading}
          onClick={onLogin}
          className="w-full bg-blue-500 hover:bg-blue-700
          disabled:bg-gray-400 disabled:cursor-not-allowed
          transition-all duration-200
          text-white font-semibold py-3 px-4 rounded-lg shadow-md"
        >
          {loading ? "Please wait..." : "Login"}
        </button>

        <Link
          href="/signup"
          className="mt-5 text-blue-500 hover:text-blue-700 transition-colors"
        >
          Don&apos;t have an account? Signup
        </Link>
      </div>
    </div>
  );
}
