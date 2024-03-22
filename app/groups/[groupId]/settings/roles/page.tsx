"use client";
import React, { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner } from "react-icons/im";

const getGroup = async (groupId: string) => {
  try {
    const res = await fetch(`/api/groups/${groupId}/users
    `);
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
async function makeAdmin(groupId: string, userId: string) {
  const res = await fetch(`/api/groups/${groupId}/admins`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
}
async function removeMember(groupId: string, memberId: string) {
  const res = await fetch(`/api/groups/${groupId}/members/${memberId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
}
async function demoteAdmin(groupId: string, adminId: string) {
  const res = await fetch(`/api/groups/${groupId}/admins/${adminId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
}

const filter = (group, user: string) => {
  const filteredMembers = group.GroupMember.filter((member) =>
    member.User.name.toLowerCase().includes(user.toLowerCase())
  );

  const filteredAdmins = group.GroupAdmin.filter((admin) =>
    admin.User.name.toLowerCase().includes(user.toLowerCase())
  );
  return { filteredMembers, filteredAdmins };
};

export default function page({ params }) {
  const { groupId } = params;
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const removeMemberMutation = useMutation({
    mutationFn: (memberId: string) => removeMember(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
  const makeAdminMutation = useMutation({
    mutationFn: (adminId: string) => makeAdmin(groupId, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });
  const demoteAdminMutation = useMutation({
    mutationFn: (adminId: string) => demoteAdmin(groupId, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["group", groupId] });
    },
  });

  const { data: group, isPending } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroup(groupId),
  });

  if (isPending) {
    return (
      <div className="flex w-full justify-center items-center text-3xl font-bold">
        <ImSpinner className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }
  const { filteredMembers, filteredAdmins } = filter(group, searchInput);

  async function handleRemoveMember(memberId: string) {
    try {
      await removeMemberMutation.mutateAsync(memberId);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }
  async function handleMakeAdmin(adminId: string) {
    try {
      await makeAdminMutation.mutateAsync(adminId);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }
  async function handleDemoteAdmin(adminId: string) {
    try {
      await demoteAdminMutation.mutateAsync(adminId);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <input
        type="text"
        name="user"
        placeholder="Search..."
        className="mb-4 mt-8 p-2 border border-gray-300 rounded w-full"
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <h3 className="text-xl font-semibold mb-4 ">Group Admins</h3>
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-300 text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 border-b-2 border-gray-300 text-gray-700">
              Role
            </th>
            <th className="px-4 py-2 border-b-2 border-gray-300 text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin) => (
            <tr key={admin.id}>
              <td className="border px-4 py-2">{admin.User.name}</td>
              <td className="border px-4 py-2">Admin</td>
              <td className="border px-4 py-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => handleDemoteAdmin(admin.User.id)}
                >
                  Demote Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="my-8 w-full border border-black" />
      <h3 className="text-xl font-semibold mb-4 mt-8">Group Members</h3>
      <table className="table-auto w-full text-left whitespace-no-wrap">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2 border-gray-300 text-gray-700">
              Name
            </th>
            <th className="px-4 py-2 border-b-2 border-gray-300 text-gray-700">
              Role
            </th>
            <th className="px-4 py-2 border-b-2 border-gray-300 text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td className="border px-4 py-2">{member.User.name}</td>
              <td className="border px-4 py-2">Member</td>
              <td className="border px-4 py-2 ">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  onClick={() => handleRemoveMember(member.User.id)}
                >
                  Remove from Group
                </button>
                <button
                  className="ml-4 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
                  onClick={() => handleMakeAdmin(member.User.id)}
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
