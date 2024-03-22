import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import PostLikeDislikeButton from "./PostLikeDislikeButton";
import CommentCount from "./CommentCount";
import GroupImageSm from "./GroupImageSm";

type PostProps = {
  groupId: string;
  postId: string;
  title: string;
  date: string;
  likes: number;
  avatar: string;
  dislikes: number;
  author: string;
  authorId: string;
};

function Post({
  groupId,
  postId,
  title,
  author,
  authorId,
  avatar,
  date,
  likes,
  dislikes,
}: PostProps) {
  return (
    <>
      <article className="w-full  px-6  bg-white py-10  over:shadow-xl  rounded-xl flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${authorId}`}>
            <GroupImageSm image={avatar} />
          </Link>
          <Link href={`/profile/${authorId}`}>
            <h2 className="text-md text-gray-600 font-semibold hover:underline">
              {author}
            </h2>
          </Link>

          <h3 className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(date))}
          </h3>
        </div>
        <Link href={`/groups/${groupId}/posts/${postId}`}>
          <h2 className="text-xl font-bold">{title}</h2>
        </Link>
        <div className="flex items-center gap-4">
          <PostLikeDislikeButton
            postId={postId}
            difference={likes - dislikes}
          />
          <CommentCount postId={postId} />
        </div>
      </article>
      <hr className="mt-1 border-gray-300" />
    </>
  );
}

export default Post;
