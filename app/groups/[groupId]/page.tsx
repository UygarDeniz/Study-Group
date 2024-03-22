import GroupImage from "../../(components)/GroupImage";
import { FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa6";
import Post from "../../(components)/Post";
import JoinButton from "../../(components)/JoinLeaveButton";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/app/_utils/db";

const getGroup = async (groupId: string, page) => {
  const pageSize = 6;
  try {
    const foundGroup = await db.group.findUnique({
      where: {
        id: Number(groupId),
      },
      include: {
        Post: {
          include: {
            PostLike: true,
            PostDislike: true,
            author: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          take: pageSize,
          skip: page > 1 ? (page - 1) * pageSize : 0,
        },
        GroupMember: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        GroupAdmin: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return foundGroup;
  } catch (error) {
    console.error(error);
  }
};

export default async function GroupPage({ params, searchParams }) {
  const { groupId } = params;

  const page = parseInt(searchParams.page) || 1;
  const sort = searchParams.sort || "latest";

  const session = await getServerSession(options);
  const user = session?.user;

  const group = await getGroup(groupId, page);

  if (!group) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          Sorry, there is no group has this name
        </h1>
      </div>
    );
  }
  const isAdmin = group.GroupAdmin.some((admin) => admin.userId === user.id);
  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className=" mx-auto max-w-7xl  px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-col md:flex-row md:items-center justify-between py-6">
          <div className="flex items-center space-x-4">
            <GroupImage image={group.avatar} alt={group.name} />
            <h1 className="text-3xl md:text-5xl font-bold">{group.name}</h1>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <JoinButton groupId={groupId} />
            <Link
              className="flex items-center hover:bg-gray-100 justify-center px-5 py-3 border-2 border-black text-base font-medium rounded text-gray-700 "
              href={`/groups/${groupId}/new`}
            >
              <FaPlus className="mr-2" />
              Create Post
            </Link>
            {isAdmin && (
              <Link
                className="  px-5 py-3 text-base font-medium rounded bg-red-500 text-white hover:bg-red-600"
                href={`/groups/${groupId}/settings`}
              >
                Settings
              </Link>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 ">
            <div className="flex justify-end space-x-4">
              <button className={sort === "latest" ? "font-semibold" : ""}>
                Latest
              </button>
              <button className={sort === "popular" ? "font-semibold" : ""}>
                Popular
              </button>
            </div>
            <hr />
            <div>
              {group.Post?.length !== 0 ? (
                group.Post.map((post) => (
                  <Post
                    key={post.id}
                    groupId={group.id.toString()}
                    postId={post.id.toString()}
                    title={post.title}
                    author={post.author.name}
                    avatar={post.author.avatar}
                    authorId={post.author.id.toString()}
                    date={post.createdAt.toString()}
                    likes={post.PostLike.length}
                    dislikes={post.PostDislike.length}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center h-64">
                  <h1 className="text-3xl font-bold text-gray-500">
                    No post found
                  </h1>
                </div>
              )}
            </div>
            <div className="mt-40 flex justify-center space-x-4 ">
              <Link
                href={`/groups/${groupId}?page=${page > 1 ? page - 1 : 1}`}
                className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <FaArrowLeft />
              </Link>
              <Link
                className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                href={`/groups/${groupId}?page=${page + 1}`}
              >
                <FaArrowRight />
              </Link>
            </div>
          </div>
          <aside>
            <div className="p-6 bg-gray-50 rounded-lg shadow break-words">
              <h2 className="text-2xl font-bold mb-4">Group Description</h2>
              <p className="text-gray-600  ">{group.description}</p>
            </div>
            <div>
              <div className="mt-6 overflow-auto max-h-60">
                <h2 className="text-2xl font-bold mb-4">
                  Members ({group.GroupMember.length})
                </h2>
                <ul className="space-y-2">
                  {group.GroupMember.map((member) => (
                    <li key={member.id} className="text-gray-600">
                      {member.User.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 overflow-auto max-h-60">
                <h2 className="text-2xl font-bold mb-4">
                  Admins ({group.GroupAdmin.length})
                </h2>
                <ul className="space-y-2">
                  {group.GroupAdmin.map((admin) => (
                    <li key={admin.id} className="text-gray-600">
                      {admin.User.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
