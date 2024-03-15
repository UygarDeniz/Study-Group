"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import GroupImageMd from "../../../../(components)/GroupImageMd";
import Link from "next/link";

import { formatDistanceToNow } from "date-fns";
import NewComment from "@/app/(components)/NewComment";
import Comment from "@/app/(components)/Comment";
import JoinButton from "@/app/(components)/JoinLeaveButton";
import usePost from "@/app/hooks/useComments";

import { ImSpinner2 } from "react-icons/im";

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

function Post({ params }: Props) {
  const { groupId, postId } = params;
  const [pageNumber, setPageNumber] = useState(1);
  const [group, setGroup] = useState<Group>();
  const { results, loading, error, isError, hasNextPage } = usePost(
    pageNumber,
    groupId,
    postId
  );
  const observer = useRef<IntersectionObserver | undefined>();
  const lastCommentElementRef = useCallback(
    (commentElement: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (commentElement) observer.current.observe(commentElement);
    },
    [loading, hasNextPage]
  );

  const content = results?.Comment?.map((comment, i) => {
    if (results.Comment.length === i + 1) {
      return (
        <Comment
          key={comment.id}
          id={comment.id}
          name={comment.author.name}
          date={comment.createdAt}
          content={comment.content}
          likes={comment.CommentLike.length}
          dislikes={comment.CommentDislike.length}
          ref={lastCommentElementRef}
        />
      );
    }
    return (
      <Comment
        key={comment.id}
        id={comment.id}
        name={comment.author.name}
        date={comment.createdAt}
        content={comment.content}
        likes={comment.CommentLike.length}
        dislikes={comment.CommentDislike.length}
      />
    );
  });

  useEffect(() => {
    const fetchGroup = async () => {
      const res = await fetch(`/api/groups/${groupId}?includePosts=false`);
      const data = await res.json();
      setGroup(data.group);
    };
    fetchGroup();
  }, [groupId]);

  return (
    <div className=" max-w-screen-xl mx-auto mt-10 min-h-screen">
      <main className="grid grid-cols-5 justify-between">
        <div className="col-span-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GroupImageMd image="/group2.jpg" />
              <div>
                <div className="flex items-center gap-3">
                  <Link href={`/groups/${groupId}`} className="text-lg mt-0.5">
                    {group?.name}
                  </Link>
                  <h2 className="text-gray-500">
                    {formatDistanceToNow(results?.createdAt ? new Date(results?.createdAt) : new Date())} 
                  </h2>
                </div>
                <h1>{results?.author?.name}</h1>
              </div>
            </div>
            <JoinButton groupId={groupId} />
          </div>
          <h2 className="text-3xl mb-10 mt-4">{results?.title}</h2>
          <hr className="m-2" />
          <NewComment postId={postId} groupId={groupId} />
          {content}
          {loading && (
            <div className="flex justify-center mt-4">
              <ImSpinner2 className="animate-spin  text-2xl" />
            </div>
          )}

          <p className="text-center text-lg mt-2">
            <a href="#top">Back to Top</a>
          </p>
        </div>

        <aside className=" p-4 bg-slate-100 rounded-xl ml-2 hidden md:block max-h-[700px]">
          <h2 className="text-2xl font-bold mb-6">Group Description</h2>
          <p className="">{group?.description}</p>
        </aside>
      </main>
    </div>
  );
}

export default Post;
