import React from "react";
import Link from "next/link";
function Post({ groupId, postId}) {
  return (
    <article className="w-full p-4">
      <Link href={`/groups/${groupId}/posts/${postId}`}>
        <h2 className="text-xl font-bold">Post Title</h2>
        <p>Post Content</p>
      </Link>
    </article>
  );
}

export default Post;
