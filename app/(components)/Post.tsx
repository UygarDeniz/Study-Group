import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type PostProps = {
  groupId: string;
  postId: string;
  title: string;
  content: string;
  date: string;
};

function Post({ groupId, postId, title, content, date }: PostProps) {
  return (
    <>
      <article className="w-full p-4 hover:shadow-xl hover:bg-slate-50 rounded-xl">
        <Link href={`/groups/${groupId}/posts/${postId}`}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{title}</h2>
            <h3 className="text-md text-gray-500">
              {formatDistanceToNow(new Date(date))}
            </h3>
          </div>

          <p className="mt-2">{content}</p>
        </Link>
      </article>
      <hr className="mt-1 border-gray-300"/>
    </>
  );
}

export default Post;
