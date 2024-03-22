"use client";

import React from "react";
import { ImSpinner2 } from "react-icons/im";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

type JoinButtonProps = {
  groupId: string;
  color?: string;
};

function JoinButton({ groupId, color }: JoinButtonProps) {
  const router = useRouter();

  const fetchMembership = async (groupId) => {
    const res = await fetch(`/api/groups/${groupId}/membership`);

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data.isMember;
  };

  const joinGroup = async (groupId) => {
    const res = await fetch(`/api/groups/${groupId}/join`, {
      method: "POST",
    });
    if (res.status === 401) {
      router.push("/api/auth/signin");
    }
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };

  const leaveGroup = async (groupId) => {
    const res = await fetch(`/api/groups/${groupId}/leave`, { method: "POST" });
    if (res.status === 401) {
      router.push("/api/auth/signin");
    }
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  };
  const queryClient = useQueryClient();
  const buttonColor =
    color === "red"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-black hover:bg-gray-700";

  const { data: isMember, isPending } = useQuery({
    queryKey: ["membership", groupId],
    queryFn: () => fetchMembership(groupId),
  });

  const joinMutation = useMutation({
    mutationFn: () => joinGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership", groupId] });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => leaveGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership", groupId] });
    },
  });

  const handleJoin = () => {
    joinMutation.mutate();
  };

  const handleLeave = () => {
    leaveMutation.mutate();
  };
  if (isPending) {
    return (
      <button
        className={`md:text-lg px-9 py-2 rounded transition-colors duration-200 ease-in-out text-white  hover:text-white ${buttonColor}`}
      >
        <ImSpinner2 className="text-xl animate-spin " />
      </button>
    );
  }
  return !isMember ? (
    <button
      onClick={handleJoin}
      className={`md:text-lg px-7 py-1 rounded transition-colors duration-200 ease-in-out text-white  hover:text-white ${buttonColor}`}
    >
      Join
    </button>
  ) : (
    <button
      onClick={handleLeave}
      className={`md:text-lg px-5 py-1 rounded transition-colors duration-200 ease-in-out text-white  hover:text-white ${buttonColor}`}
    >
      Leave
    </button>
  );
}

export default JoinButton;
