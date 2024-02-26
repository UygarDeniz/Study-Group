import React from "react";
import Image from "next/image";
function GroupImage({image}) {
  return (
    <div className="rounded-full bg-white p-2 ">
      <Image
        src={image}
        alt="Group 1"
        width="100"
        height="100"
        className="rounded-full"
      />
    </div>
  );
}

export default GroupImage;
