"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { set } from "mongoose";

export default function VerifyEmailPage() {
  const [token, setToken] = useState<string>("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {verified && (
        <>
          <h1 className="text-2xl font-bold text-green-600 mb-4">
            Email Verified Successfully!
          </h1>
          <Link href="/login" className="text-blue-500 hover:underline">
            Go to Login
          </Link>
        </>
      )}
    </div>
  );
}
