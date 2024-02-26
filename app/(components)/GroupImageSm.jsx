import React from "react";
import Image from "next/image";
function GroupImageSm({ image }) {
  return (
    <div className="rounded-full bg-white">
      <Image
        src={image}
        alt="Group 1"
        width="28"
        height="28"
        sizes="max-width:1px"
        className="rounded-full "
      />
    </div>
  );
}

export default GroupImageSm;
