import React from "react";
import GroupImageMd from "../../../../(components)/GroupImageMd.jsx";
import GroupImageSm from "@/app/(components)/GroupImageSm.jsx";
import Link from "next/link";
import Comment from "@/app/(components)/Comment.jsx";
import { FaPlus } from "react-icons/fa6";
function Post({ groupId, postId }) {
  return (
    <div className="max-w-screen-xl mx-auto pt-6 h-screen">
      <div className="flex items-center justify-between">
        <div className="flex">
          <GroupImageMd image="/group2.jpg" />
          <div>
            <h1 className="text-lg mt-0.5">Group Name</h1>
            <h1>User</h1>
          </div>
        </div>
        <button className="md:text-lg px-6 py-1 rounded-3xl transition-colors duration-200 ease-in-out text-white bg-black hover:bg-gray-700 hover:text-white">
          Join
        </button>
      </div>
      <h2 className="text-3xl">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </h2>
      <hr className="mt-2" />
      <Link
        href={`/groups/${groupId}/new`}
        className="max-w-44 mt-16 flex items-center justify-center text-lg gap-1 border-2 border-black hover:bg-slate-300 rounded-3xl px-4 py-1 transition-colors duration-200 ease-in-out"
      >
        <FaPlus />
        <span>Create Post</span>
      </Link>

      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export default Post;
