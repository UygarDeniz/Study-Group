"use client";

import React, { useEffect, useState } from "react";

import { ImSpinner2 } from "react-icons/im";

type JoinButtonProps = {
  groupId: string;
  color?: string;
};

function JoinButton({ groupId, color }: JoinButtonProps) {
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);

  const buttonColor =
    color === "red"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-black hover:bg-gray-700";

  useEffect(() => {
    const checkMembership = async () => {
      const res = await fetch(`/api/groups/${groupId}/membership`);
      const data = await res.json();
      setIsMember(data.isMember);
      setLoading(false);
    };
    checkMembership();
  }, [groupId]);

  const handleJoin = async () => {
    const res = await fetch(`/api/groups/${groupId}/join`, { method: "POST" });
    if (res.ok) {
      setIsMember(true);
    }
  };

  const handleLeave = async () => {
    const res = await fetch(`/api/groups/${groupId}/leave`, { method: "POST" });
    if (res.ok) {
      setIsMember(false);
    }
  };

  return !isMember ? (
    <button
      onClick={handleJoin}
      className={`md:text-lg px-6 py-1 rounded-3xl transition-colors duration-200 ease-in-out text-white  hover:text-white ${buttonColor}`}
    >
      {loading ? (
        <div className="px-4 py-1">
          <ImSpinner2 className="text-lg animate-spin" />
        </div>
      ) : (
        "Join"
      )}
    </button>
  ) : (
    <button
      onClick={handleLeave}
      className={`md:text-lg px-6 py-1 rounded-3xl transition-colors duration-200 ease-in-out text-white  hover:text-white ${buttonColor}`}
    >
      {loading ? <ImSpinner2 className="text-2xl animate-spin " /> : "Leave"}
    </button>
  );
}

export default JoinButton;
