import Link from "next/link";
import React from "react";

export default function layout({ children, params }) {
  const { groupId } = params;
  return (
    <div className="min-h-screen max-w-screen-xl border border-black mt-20 mx-auto bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64  p-4  border border-black bg-white">
        <h2 className="text-2xl font-semibold mb-4">Group Settings</h2>
        <ul>
          <li>
            <Link href={`/groups/${groupId}/settings`} className="text-lg ">Settings</Link>
          </li>
          <li>
            <Link href={`/groups/${groupId}/settings/roles`} className="text-lg">Roles</Link>
          </li>
        </ul>
      </div>
      {/* Main content */}
      {children}
    </div>
  );
}
