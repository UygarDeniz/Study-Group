"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  email: string;
  bio: string;
}

function EditProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        setUserInfo(data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchUser();
  }, []);

  const changeUserSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userInfo.name || !userInfo.email) {
      alert("Missing name or email");
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const data: UserInfo = await res.json();
      res.ok ? alert("Profile Updated") : alert("Error");
      res.ok && setUserInfo(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center ">
      <div className="bg-white  px-2 py-6 sm:p-20  w-full md:w-[600px] rounded-2xl shadow-lg">
        <div className="block pl-2 font-semibold text-xl  text-gray-700">
          <h2 className="leading-relaxed">Edit Profile</h2>
          <p className="text-sm text-gray-500 font-normal ">
            Update your account details.
          </p>
        </div>

        <form className="space-y-6 py-8" onSubmit={changeUserSettings}>
          <div className="relative">
            <input
              type="name"
              value={userInfo.name}
              name="name"
              className="  w-full border-2 py-8 px-2 border-gray-800 text-gray-900  focus:outline-none focus:border-rose-600"
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
              required
            />
            <label
              htmlFor="name"
              className="absolute left-3  top-0 text-gray-600 text-md"
            >
              Name
            </label>
          </div>
          <div className="relative">
            <input
              type="email"
              value={userInfo.email}
              name="email"
              className=" w-full border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3  top-0 text-gray-600 text-md "
            >
              Email
            </label>
          </div>
          <div className="relative">
            <textarea
              name="bio"
              value={userInfo.bio}
              className="peer w-full border-2 py-8 px-2 border-gray-800 text-gray-900  focus:outline-none focus:border-rose-600"
              maxLength={250}
              onChange={(e) =>
                setUserInfo({ ...userInfo, bio: e.target.value })
              }
            />
            <label
              htmlFor="bio"
              className=" absolute left-3  top-0 text-gray-600 text-md peer-focus:-top-6  transition-all"
            >
              Bio (optional)
            </label>
          </div>
          <button className="border border-black px-4 py-3 rounded-2xl w-full bg-gradient-to-br text-white from-red-500 to bg-violet-500 ">
            Save
          </button>
        </form>
        <hr className="w-full border border-red-300 mt-4" />
        <div></div>
        <div className="text-right ">
          <Link
            href="/profile/edit/password"
            className=" text-red-500 text-lg font-semibold hover:underline"
          >
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
