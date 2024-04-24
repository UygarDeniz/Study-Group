"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { UploadButton } from "@/app/_utils/uploadthings";
import Image from "next/image";

interface UserInfo {
  name: string;
  email: string;
  bio: string;
  avatar: string;
}

const fetchUser = async () => {
  const res = await fetch("/api/profile");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

const updateUser = async (userInfo: UserInfo) => {
  const res = await fetch("/api/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }

  return res.json();
};

function EditProfile() {
  const [userProfile, setUserProfile] = useState<UserInfo>({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  });

  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    if (data) {
      setUserProfile(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      alert("Profile Updated");
      setUserProfile(data);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    },
  });

  const changeUserSettings = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userProfile.name || !userProfile.email) {
      alert("Missing name or email");
      return;
    }

    mutation.mutate(userProfile);
  };

  if (isPending) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center ">
      <div className="bg-white flex flex-col items-center px-2 py-6 sm:p-20  w-full md:w-[600px] rounded-2xl shadow-lg my-5">
        <Image
          src={userProfile.avatar}
          alt="Profile"
          width="144"
          height="144"
          className="rounded-full aspect-square object-cover"
        />

        <UploadButton
          endpoint="profilePicture"
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              setUserProfile({ ...userProfile, avatar: res[0].url });
            }
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>

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
              value={userProfile.name}
              name="name"
              className="  w-full border-2 py-8 px-2 border-gray-800 text-gray-900  focus:outline-none focus:border-rose-600"
              onChange={(e) =>
                setUserProfile({ ...userProfile, name: e.target.value })
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
              value={userProfile.email}
              name="email"
              className=" w-full border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
              onChange={(e) =>
                setUserProfile({ ...userProfile, email: e.target.value })
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
              value={userProfile.bio}
              className="peer w-full border-2 py-8 px-2 border-gray-800 text-gray-900  focus:outline-none focus:border-rose-600"
              maxLength={250}
              onChange={(e) =>
                setUserProfile({ ...userProfile, bio: e.target.value })
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
            href="/profile/me/edit/password"
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
