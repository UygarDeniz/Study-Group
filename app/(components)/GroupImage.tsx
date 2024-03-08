import React from "react";
import Image from "next/image";

type GroupImageProps = {
  image: string;
  alt: string;
};

function GroupImage({ image, alt }: GroupImageProps) {
  return (
    <div className="rounded-full  ">
      <Image
        src={image }
        alt={alt}
        width="100"
        height="100"
        className="rounded-full"
      />
    </div>
  );
}

export default GroupImage;
