import React from "react";
import GroupImageSm from "@/app/(components)/GroupImageSm";
import { formatDistanceToNow } from "date-fns";
import  CommentLikeDislikeButton  from "@/app/(components)/CommentLikeDislikeButton";
type CommentProps = {
  id: number;
  username: string;
  date: Date;
  content: string;
  likes: number;
  dislikes: number;
};

function Comment({ id , username, date, content, likes, dislikes }: CommentProps) {
  return (
    <div className="flex  p-4 hover:shadow-inner hover:bg-gray-200 rounded-xl ">
      <div className="flex  mt-1 min-w-7">
        <GroupImageSm image="/group2.jpg" />
      </div>
      <div className="mx-4 ">
        <div className="flex gap-4   items-center">
          <h2 className="text-lg ">{username}</h2>
          <h2 className="text-md text-gray-500">
            {formatDistanceToNow(new Date(date))}
          </h2>
        </div>
        <p className="mt-1">{content}</p>
        <div className="flex gap-4 mt-2">
          <CommentLikeDislikeButton difference={likes - dislikes} commentId = {id}/>
        </div>
      </div>
    </div>
  );
}

export default Comment;
