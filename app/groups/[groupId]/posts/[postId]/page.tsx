import React from "react";
import GroupImageMd from "../../../../(components)/GroupImageMd";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { formatDistanceToNow } from "date-fns";
import NewComment from "@/app/(components)/NewComment";
import Comment from "@/app/(components)/Comment";
import JoinButton from "@/app/(components)/JoinLeaveButton";

type Params = {
  groupId: string;
  postId: string;
};

type Props = {
  params: Params;
};

type User = {
  id: number;
  name: string;
};

type Post = {
  id: number;
  title: string;
  createdAt: Date;
  comment: Comment[];
};

type Comment = {
  id: number;
  content: string;
  createdAt: Date;
  author: User;
  CommentDislike: CommentDislike[];
  CommentLike: CommentLike[];
};
type CommentLike = {
  id: number;
  userId: number;
  commentId: number;
};

type CommentDislike = {
  id: number;
  userId: number;
  commentId: number;
};

type Group = {
  id: number;
  name: string;
  description: string;
};

async function Post({ params }: Props) {
  const { groupId, postId } = params;
  const prisma = new PrismaClient();
  const session = await getServerSession(options);

  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
    },
    include: {
      Comment: {
        include: {
          author: true,
          CommentDislike: true,
          CommentLike: true,
        },
      },
    },
  });
  const group: Group = await prisma.group.findUnique({
    where: {
      id: Number(groupId),
    },
  });
  const user: User = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return (
    <div className=" max-w-screen-xl mx-auto mt-10 min-h-screen">
      <div className="grid grid-cols-5 justify-between">
        <div className="col-span-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GroupImageMd image="/group2.jpg" />
              <div>
                <div className="flex items-center gap-3">
                  <Link href={`/groups/${groupId}`} className="text-lg mt-0.5">
                    {group.name}
                  </Link>
                  <h2 className="text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt))}
                  </h2>
                </div>
                <h1>{user.name}</h1>
              </div>
            </div>
            <JoinButton groupId={groupId} />
          </div>
          <h2 className="text-3xl mb-10 mt-4">{post.title}</h2>
          <hr className="m-2" />
          <NewComment postId={postId} groupId={groupId} />
          {post.Comment.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              username={comment.author.name}
              date={comment.createdAt}
              content={comment.content}
              likes={comment.CommentLike.length}
              dislikes={comment.CommentDislike.length}
            />
          ))}
        </div>

        <div className=" p-4 bg-slate-100 rounded-xl ml-2 hidden md:block max-h-[700px]">
          <h2 className="text-2xl font-bold mb-6">Group Description</h2>
          <p className="">{group.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
