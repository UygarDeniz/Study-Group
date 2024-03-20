import React from "react";
import { db } from "@/app/_utils/db";
import Image from "next/image";
import GroupCard from "@/app/(components)/GroupCard";


async function getUserProfile(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: Number(userId),
    },
  });
  return user;
}

async function getMemberedGroups(userId: string) {
  try {
    const groups = await db.groupMember.findMany({
      where: {
        userId: Number(userId),
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

export default async function UserProfile({ params }) {
  const { userId } = params;
  const userInfo = await getUserProfile(userId);
  const groups = await getMemberedGroups(userId);

  if (!userInfo) {
    return (
      <div className="h-screen flex justify-center items-center">
        {" "}
        <h1 className="text-3xl font-bold">
          Sorry, there is no user has this name
        </h1>{" "}
      </div>
    );
  }
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
