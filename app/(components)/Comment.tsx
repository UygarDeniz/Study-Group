"use client";
import React from "react";
import GroupImageSm from "@/app/(components)/GroupImageSm";
import { formatDistanceToNow } from "date-fns";
import CommentLikeDislikeButton from "@/app/(components)/CommentLikeDislikeButton";
import Link from "next/link";
type CommentProps = {
  id: number;
  name: string;
  date: string;
  content: string;
  avatar: string;
  likes: number;
  dislikes: number;
  authorId: number;
};

const Comment = React.forwardRef(
  (
    { id, name, avatar, date, content, likes, dislikes, authorId }: CommentProps,
    ref
  ) => {
    
    const commentBody = (
      <div className="flex  p-4 hover:shadow-inner hover:bg-gray-200 rounded-xl ">
        <Link href={`/profile/${authorId}`}>
          <div className="flex  mt-1 min-w-7">
            <GroupImageSm image={avatar} />
          </div>
        </Link>
        <div className="mx-4 ">
          <div className="flex gap-4   items-center">
            <Link href={`/profile/${authorId}`}>
              <h2 className="text-lg hover:underline">{name}</h2>
            </Link>
            <h2 className="text-md text-gray-500">
              {formatDistanceToNow(new Date(date))}
            </h2>
          </div>
          <p className="mt-1">{content}</p>
          <div className="flex gap-4 mt-2">
            <CommentLikeDislikeButton
              difference={likes - dislikes}
              commentId={id}
            />
          </div>
        </div>
      </div>
    );
    const comment = ref ? (
      <article ref={ref as React.RefObject<HTMLElement>}>{commentBody}</article>
    ) : (
      <article>{commentBody}</article>
    );
    return comment;
  }
);

export default Comment;
