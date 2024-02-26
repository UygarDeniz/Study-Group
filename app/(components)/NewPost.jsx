"use client";
import { FaTimes } from "react-icons/fa";
import React, { useState } from "react";
function NewPost({ close }) {
  return (
    <form className="relative flex  w-1/3 flex-col gap-4  bg-white p-12 rounded-lg">
      <button
        className="absolute top-0 right-0 mr-2 mt-2 text-xl"
        onClick={close}
      >
        <FaTimes />
      </button>
      <h1 className="text-3xl font-bold">Create Post</h1>
      <input
        type="text"
        placeholder="Title"
        className="border-2 border-gray-300 p-2"
      />
      <textarea
        placeholder="Content"
        className="border-2 border-gray-300 p-2"
      ></textarea>
      <button className="bg-black text-white p-2 rounded-md">Submit</button>
    </form>
  );
}

export default NewPost;
