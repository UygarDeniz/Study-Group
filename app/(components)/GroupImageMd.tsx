import React from "react";
import Image from "next/image";

type GroupImageMdProps = {
  image: string;
};
function GroupImageMd({image}: GroupImageMdProps) {
  return (
    <div className="rounded-full ">
      <Image
        src={image}
        alt="Group 1"
        width="44"
        height="44"
        className="rounded-full"
      />
    </div>
  );
}

export default GroupImageMd;
