"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { UploadButton } from "@/app/_utils/uploadthings";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa6";
import { set } from "date-fns";
import { ImSpinner } from "react-icons/im";
const fetchGroup = async (groupId: string) => {
  const res = await fetch(`/api/groups/${groupId}?includePosts=false`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.group;
};

export default function page({ params }) {
  const { groupId } = params;
  const [groupPicture, setGroupPicture] = useState("");

  const changeGroupPicture = async (
    groupId,
    newGroupPicture,
    setGroupPicture
  ) => {
    const res = await fetch(`/api/groups/${groupId}/picture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupPicture: newGroupPicture }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    setGroupPicture(data);
    return data;
  };
  const { data, isPending, isSuccess, isError } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => fetchGroup(groupId),
  });
  useEffect(() => {
    if (isSuccess) {
      setGroupPicture(data.avatar);
    }
  }, [isSuccess, data]);
  if (isPending) {
    return (
      <div className="w-full flex justify-center items-center">
        <ImSpinner className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center px-36 py-20 bg-white rounded-md ">
        <h1 className="text-3xl font-bold">Change Group Picture</h1>
        {groupPicture && (
          <Image
            src={groupPicture}
            alt="Group Picture"
            width="150"
            height="150"
            className="rounded-full mb-16 mt-10"
            priority
          />
        )}
        <UploadButton
          endpoint="groupPicture"
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              const newGroupPicture = res[0].url;

              changeGroupPicture(groupId, newGroupPicture, setGroupPicture);
            }
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
}
