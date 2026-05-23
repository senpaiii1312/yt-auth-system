"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error("Logout failed");
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log("User details:", res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-4">
      <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl p-8 flex flex-col items-center w-full max-w-md">
        <h1 className="text-4xl font-bold text-white mb-3">Profile</h1>

        <p className="text-zinc-400 mb-6 text-center">
          Welcome to your profile page!
        </p>
        <h2 className="text-xl font-semibold text-white mb-2">
          {data === "nothing" ? (
            "nothing"
          ) : (
            <Link href={`/profile/${data}`}>{data}</Link>
          )}
        </h2>
        <div className="w-full border-t border-zinc-700 mb-6"></div>
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-700
          transition-all duration-200
          text-white font-semibold py-3 px-4
          rounded-lg shadow-lg"
        >
          Logout
        </button>
        <button
          onClick={getUserDetails}
          className="w-full bg-blue-500 hover:bg-blue-700
          transition-all duration-200
          text-white font-semibold py-3 px-4
          rounded-lg shadow-lg"
        >
          Get User Details
        </button>
      </div>
    </div>
  );
}
