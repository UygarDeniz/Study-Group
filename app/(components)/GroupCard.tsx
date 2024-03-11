import React from "react";
import Image from "next/image";
import Link from "next/link";
import JoinButton from "./JoinLeaveButton";

type GroupCardProps = {
  id: string;
  name: string;
  description: string;
};

function GroupCard({ id, name, description }: GroupCardProps) {
  return (
    <div className="bg-white shadow-xl hover:shadow-2xl rounded-lg w-80 pb-6 text-center">
      <Link href={`/groups/${id}`} className="flex flex-col items-center ">
        <div className="w-full h-full bg-gradient-to-b from-slate-200 to-white py-6 flex items-center justify-center rounded-t-lg">
          <div className="rounded-full bg-white p-2 ">
            <Image
              src="/group1.jpg"
              alt="Group 1"
              width="100"
              height="100"
              className="rounded-full"
            />
          </div>
        </div>
        <h3 className="text-2xl mt-8 font-bold ">{name}</h3>
        <p className="text-center mt-4 mb-2">
          {description.length > 100
            ? description.substring(0, 100) + "..."
            : description}
        </p>
      </Link>
      <JoinButton groupId={id.toString()} color="red" />
    </div>
  );
}

export default GroupCard;
