import React from "react";
import Image from "next/image";
function GroupImageMd({image}) {
  return (
    <div className="rounded-full bg-white p-2 ">
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
