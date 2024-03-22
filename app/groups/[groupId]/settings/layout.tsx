import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { db } from "@/app/_utils/db";
export default async function layout({ children, params }) {
  const { groupId } = params;
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const isAdmin = await db.groupAdmin.findFirst({
    where: {
      userId: session.user.id,
      groupId: Number(groupId),
    },
  });
  if (!isAdmin) {
    redirect(`/groups/${groupId}`);
  }

  return (
    <div className="min-h-screen max-w-screen-xl border border-black mt-20 mx-auto bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64  p-4  border border-black bg-white">
        <h2 className="text-2xl font-semibold mb-4">Group Settings</h2>
        <ul>
          <li>
            <Link href={`/groups/${groupId}/settings`} className="text-lg ">
              Settings
            </Link>
          </li>
          <li>
            <Link
              href={`/groups/${groupId}/settings/roles`}
              className="text-lg"
            >
              Roles
            </Link>
          </li>
          <li>
            <Link
              href={`/groups/${groupId}/settings/picture`}
              className="text-lg "
            >
              Picture
            </Link>
          </li>
        </ul>
      </div>

      {children}
    </div>
  );
}
