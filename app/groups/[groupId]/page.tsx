"use client";
import { useState, useEffect } from "react";
import GroupImage from "../../(components)/GroupImage";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa6";
import Post from "../../(components)/Post";
import NewPost from "../../(components)/NewPost";
import JoinButton from "../../(components)/JoinLeaveButton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Params = {
  groupId: string;
};

type Props = {
  params: Params;
};

type PostLike = {
  postId: number;
  userId: number;
  like: boolean;
};

type PostDislike = {
  postId: number;
  userId: number;
  dislike: boolean;
};
type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  PostLike: PostLike[];
  PostDislike: PostDislike[];
};

type Group = {
  id: string;
  image?: string;
  name: string;
  Post?: Post[];
  description: string;
};

export default function GroupPage({ params }: Props) {
  const [sort, setSort] = useState("latest");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [group, setGroup] = useState<Group>({} as Group);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page"));

  const { groupId } = params;

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(
          `/api/groups/${groupId}?page=${page}&sort=${sort}&includePosts=true`
        );
        const data = await res.json();
        data.group.image = data.group.image || "/group1.jpg";
        setGroup(data.group);
      } catch (err) {
        console.error(err);
      }
    };
    getPosts();
  }, [page]);

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen">
      {showNewPostForm && (
        <div className="fixed inset-0 z-1 flex items-center justify-center bg-black bg-opacity-50">
          <NewPost
            groupId={group.id}
            close={() => setShowNewPostForm(!showNewPostForm)}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row p-4 item-start md:items-center justify-between bg-gradient-to-b from-gray-100 to-white">
        <div className="flex items-center">
          <GroupImage image={group.image} alt={group.name} />

          <h1 className="text-3xl md:text-5xl font-bold mx-6">{group.name}</h1>
        </div>

        <div className="flex gap-4 item-center mt-4 md:m-0">
          <JoinButton groupId={groupId} />

          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            className="flex items-center justify-center text-lg gap-1 border-2 border-black hover:bg-slate-300 rounded-3xl px-4 py-1 transition-colors duration-200 ease-in-out"
          >
            <FaPlus />
            Create Post
          </button>
        </div>
      </div>
      <main className="grid grid-cols-5">
        <div className="col-span-5 md:col-span-4">
          <div className="flex items-center gap-1 justify-end mr-20">
            <button
              onClick={() => setSort("latest")}
              className={
                sort === "latest"
                  ? "font-semibold hover:underline"
                  : "hover:underline"
              }
            >
              {" "}
              Latest{" "}
            </button>
            <span> </span>
            <span>|</span>
            <button
              onClick={() => setSort("popular")}
              className={
                sort === "popular"
                  ? "font-semibold hover:underline"
                  : "hover:underline"
              }
            >
              Popular
            </button>
          </div>

          <hr />
          <div>
            {group.Post?.length !== 0 ? (
              group.Post &&
              group.Post.map((post) => (
                <Post
                  key={post.id}
                  groupId={group.id}
                  postId={post.id.toString()}
                  title={post.title}
                  content={post.content}
                  date={post.createdAt.toString()}
                  likes={post.PostLike.length}
                  dislikes={post.PostDislike.length}
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-[50vh]">
                <h1 className="text-3xl font-bold text-gray-500">
                  No post found
                </h1>
              </div>
            )}
          </div>
          <div className="flex  justify-center mt-12">
            <Link
              href={`/groups/${groupId}?page=${page > 1 ? page - 1 : 1}`}
              className="border border-black py-2 px-4"
            >
              <FaArrowLeft />
            </Link>
            <Link
              href={`/groups/${groupId}?page=${page + 1}`}
              className="border border-black py-2 px-4 "
            >
              <FaArrowRight />
            </Link>
          </div>
        </div>

        <aside className=" p-4 bg-slate-100 rounded-xl ml-2 hidden md:block min-h-96 max-h-[700px]">
          <h2 className="text-2xl font-bold mb-6">Group Description</h2>
          <p className="">{group.description}</p>
        </aside>
      </main>
    </div>
  );
}
