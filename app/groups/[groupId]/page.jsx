"use client";
import { useState } from "react";

import GroupImage from "../../(components)/GroupImage";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import Post from "@/app/(components)/Post.jsx";
import NewPost from "@/app/(components)/NewPost.jsx";
export default function GroupPage({ params }) {
  const [sort, setSort] = useState("latest");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const { groupId } = params;
  const postId = 1;

  console.log(groupId);
  const group = {
    image: "/group1.jpg",
    name: "Group Name1",
    description: "Group Description 1",
  };

  console.log(showNewPostForm);
  return (
    <div className="max-w-screen-xl mx-auto h-screen">
      {showNewPostForm && (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black bg-opacity-50">
          
          <NewPost close={() => setShowNewPostForm(!showNewPostForm)}/>
        </div>
      )}

      <div className="flex flex-col md:flex-row p-4 item-start md:items-center justify-between bg-gradient-to-b from-slate-100 to-white">
        <div className="flex items-center">
          <GroupImage image={group.image} alt={group.name} />

          <h1 className="text-3xl md:text-5xl font-bold mx-6">{group.name}</h1>
        </div>

        <div className="flex gap-4 item-center mt-4 md:m-0">
          <button className="md:text-lg px-6 py-1 rounded-3xl transition-colors duration-200 ease-in-out text-white bg-black hover:bg-gray-700 hover:text-white">
            Join
          </button>

          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="flex items-center justify-center text-lg gap-1 border-2 border-black hover:bg-slate-300 rounded-3xl px-4 py-1 transition-colors duration-200 ease-in-out"
          >
            <FaPlus />
            Create Post
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-5 md:col-span-4">
          <div className="flex items-center gap-1 justify-end mr-20">
            <button
              onClick={() => setSort("latest")}
              className={
                sort === "latest"
                  ? "font-semibold hover:underline"
                  : "hover:underline"
              }
            >
              {" "}
              Latest{" "}
            </button>
            <span> </span>
            <span>|</span>
            <button
              onClick={() => setSort("popular")}
              className={
                sort === "popular"
                  ? "font-semibold hover:underline"
                  : "hover:underline"
              }
            >
              Popular
            </button>
          </div>

          <hr />
          <Post groupId={groupId} postId={postId} />
          <hr />
          <Post groupId={groupId} postId={postId} />
          <hr />
          <Post groupId={groupId} postId={postId} />
        </div>

        <div className=" p-4 bg-slate-100 rounded-xl ml-2 hidden md:block">
          <h2 className="text-2xl font-bold mb-6">Group Description</h2>
          <p className="">{group.description}</p>
        </div>
      </div>
    </div>
  );
}
