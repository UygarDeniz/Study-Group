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
  date,
  likes,
  dislikes,
}: PostProps) {
  return (
    <>
      <article className="w-full pt-4 px-4 pb-1 hover:shadow-xl hover:bg-slate-50 rounded-xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${authorId}`}>
            <GroupImageSm image="/group2.jpg" />
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
