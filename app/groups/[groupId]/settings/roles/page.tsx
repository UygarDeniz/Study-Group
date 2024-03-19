import React from "react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getGroup = async (groupId: string) => {
  try {
    const group = await prisma.group.findUnique({
      where: { id: Number(groupId) },
      include: {
        GroupMember: {
          include: {
            User: {
              select: {
                id: true,
                name: true,
                avatar: true,
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
                avatar: true,
              },
            },
          },
        },
      },
    });
    return group;
  } catch (error) {
    console.error(error);
  }
};
export default async function page({ params }) {
  const { groupId } = params;
  const group = await getGroup(groupId);
  return (
    <div className="flex flex-col items-center w-full">
      <input
        type="text"
        placeholder="Search..."
        className="mb-4 p-2 border border-gray-300 rounded"

      />
      <h3 className="text-xl font-semibold mb-4 ">Group Admins</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {group.GroupAdmin.map((admin) => (
            <tr key={admin.id}>
              <td className="border px-4 py-2">{admin.User.name}</td>
              <td className="border px-4 py-2">Admin</td>
              <td className="border  text-center">
                <button className="px-2 py-1 bg-blue-500 text-white rounded mr-2">
                  Make Member
                </button>
                <button className="px-2 py-1 bg-red-500 text-white rounded">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="my-8 w-full border border-black" />
      <h3 className="text-xl font-semibold mb-4 mt-8">Group Members</h3>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {group.GroupMember.map((member) => (
            <tr key={member.id}>
              <td className="border px-4 py-2">{member.User.name}</td>
              <td className="border px-4 py-2">Member</td>
              <td className="border px-4 py-2">
                <button className="px-2 py-1 bg-red-500 text-white rounded">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
