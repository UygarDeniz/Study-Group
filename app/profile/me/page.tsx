import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import GroupCard from "@/app/(components)/GroupCard";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/app/_utils/db";

async function getCurrentUser() {
  const { user } = await getServerSession(options);
  return user;
}

async function getMemberedGroups(user) {
  try {
    const groups = await db.groupMember.findMany({
      where: {
        userId: user.id,
      },

      include: {
        Group: true,
      },
    });
    return groups;
  } catch (error) {
    console.error(error);
  }
}

async function getUserInfo(user) {
  try {
    const userInfo = await db.user.findUnique({
      where: {
        id: user.id,
      },
    });
    return userInfo;
  } catch (error) {
    console.error(error);
  }
}

async function page() {
  const user = await getCurrentUser();
  const groups = await getMemberedGroups(user);
  const userInfo = await getUserInfo(user);

  return (
    <main className="flex justify-around min-h-screen  py-10">
      <div className="flex flex-col w-1/4  items-center mt-12 ">
        <div>
          <Image
            src="/group2.jpg"
            alt="Profile"
            width="150"
            height="150"
            className="rounded-full"
          />

          <p className="text-3xl mt-6 font-medium">{userInfo.name}</p>
          <p className="text-xl mt-3">{userInfo.bio}</p>

          <div className="mt-8">
            <Link
              href="/profile/me/edit"
              className=" py-2 px-14 border-2 border-black rounded-full"
            >
              {" "}
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full max-w-screen-lg mt-12 ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-medium text-gray-700">Your Groups</h1>
          <h2 className="text-lg">
            {groups.length > 1
              ? groups.length + " Groups"
              : groups.length + " Group"}
          </h2>
        </div>
        <hr className="mb-20 mt-4 border-gray-400" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-20">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              id={group.Group.id.toString()}
              name={group.Group.name}
              description={group.Group.description}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default page;
