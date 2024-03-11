"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
      } else {
        router.refresh();
        router.push("/");
        signIn("credentials", {
          username: formData.email,
          password: formData.password,
          callbackUrl: "/",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {error && (
        <div className="max-w-md w-full bg-red-400 mb-4">
          <p className="md:text-xl font-bold p-8">{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold">Join and create group now</h1>
        <div className="relative">
          <input
            className="peer border-2 border-black  w-full p-6 text-gray-700 "
            maxLength={50}
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
          />
          <label
            className={`absolute left-3 top-6  transition-all peer-focus:-top-6 ${
              formData.name.length > 0 ? "-top-6" : ""
            }`}
          >
            Name
          </label>
        </div>
        <div className="relative">
          <input
            className="peer border-2 border-black  w-full p-6 text-gray-700 "
            maxLength={50}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label
            className={`absolute left-3 top-6  transition-all peer-focus:-top-6 ${
              formData.email.length > 0 ? "-top-6" : ""
            }`}
          >
            Email
          </label>
        </div>
        <div className="relative">
          <input
            className=" peer border-2 border-black  w-full p-6 text-gray-700  "
            maxLength={50}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label
            className={`absolute left-3 top-6  transition-all peer-focus:-top-6 ${
              formData.password.length > 0 ? "-top-6" : ""
            }`}
          >
            Password
          </label>
        </div>

        <div className="flex flex-col items-center">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline">
            Sign Up
          </button>
        </div>
      </form>
      <hr className="my-8 w-3/4 md:w-1/3 bg-black h-0.5" />
      <p className="text-xl">
        Already have an account?{" "}
        <Link
          href="/api/auth/signin"
          className="text-red-500 font-bold hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default signup;
