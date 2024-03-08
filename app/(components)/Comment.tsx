import React from "react";
import GroupImageSm from "@/app/(components)/GroupImageSm";
import { formatDistanceToNow } from "date-fns";

type CommentProps = {
  username: string;
  date: Date;
  content: string;
};

function Comment({ username, date, content } : CommentProps) {
  return (
    <div className="flex  p-4 hover:shadow-inner hover:bg-gray-200 rounded-xl ">
      <div className="flex  mt-1 min-w-7">
        <GroupImageSm image="/group2.jpg" />
      </div>
      <div className="mx-4 ">
        <div className="flex gap-4   items-center">
          <h2 className="text-lg ">{username}</h2>
          <h2 className="text-md text-gray-500">{formatDistanceToNow(new Date(date))}</h2>
        </div>
        <p className="mt-1">{content}</p>
      </div>
    </div>
  );
}

export default Comment;
