import { db } from "../_utils/db";
import React, { useEffect, useState } from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaRegCompass } from "react-icons/fa6";
import SidebarGroups from "./SidebarGroups";
const getUserGroups = async (userId: string) => {
  const groups = await db.group.findMany({
    where: {
      GroupMember: {
        some: {
          userId: Number(userId),
        },
      },
    },
  });
  return groups;
};

async function Sidebar() {
  const session = await getServerSession(options);
  const user = session.user;
  const userGroups = await getUserGroups(user.id);

  return (
    <div className="fixed top-0 left-0 inset-0 flex flex-col  text-center justify-between items-center h-full p-2 bg-sky-950 w-20">
      <SidebarGroups userGroups={userGroups} />
      <nav className="flex flex-col justify-center items-center gap-4 text-white">
        <Link
          href="/profile/me"
          className="transition-colors  duration-300 ease-in-out  font-semibold"
        >
          <FaUser className="   text-3xl" />
        </Link>
        <Link
          href="/groups"
          className="transition-colors duration-200 ease-in-out font-semibold"
        >
          <FaRegCompass className="text-3xl" />
        </Link>
        <Link
          className="border-red-500 border-2 px-5 py-2 transition-colors duration-200 ease-in-out  hover:text-white font-semibold"
          href="/api/auth/signout"
        >
          Log Out
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
