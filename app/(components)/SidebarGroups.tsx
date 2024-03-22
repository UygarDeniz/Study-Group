"use client";
import Link from "next/link";
import React from "react";
import GroupImageMd from "./GroupImageMd";
import { usePathname } from "next/navigation";

export default function SidebarGroups({ userGroups }) {
  const pathname = usePathname();
  const match = pathname.match(/\/groups\/(\d+)/);
  const currentGroupId = match ? Number(match[1]) : null;

  return (
    <div className="flex flex-col gap-6 items-center mt-10">
      {userGroups?.map((group) => (
        <div key={group.id} className="flex items-center">
          <span
            className={`w-2 rounded-r-2xl h-11 -translate-x-3 ${
              group.id === currentGroupId ? "bg-sky-500" : "bg-transparent"
            }`}
          ></span>
          <Link href={`/groups/${group.id}`}>
            <GroupImageMd image={group.avatar} />
          </Link>
        </div>
      ))}
    </div>
  );
}
