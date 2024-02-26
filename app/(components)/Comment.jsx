import React from "react";
import GroupImageSm from "@/app/(components)/GroupImageSm.jsx";
function Comment() {
  return (
    <div className="flex mt-10">
      <div className="flex flex-col  min-w-7">
        <GroupImageSm image="/group2.jpg" />
      </div>
      <div className="mx-4 ">
        <div className="flex gap-4 items-center">
          <h2 className="text-lg">Username</h2>
          <h2 className="text-md text-gray-500">Date</h2>
        </div>
        <p className="mt-1">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </div>
  );
}

export default Comment;
