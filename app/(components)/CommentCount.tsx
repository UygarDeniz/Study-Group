import React from "react";

import { FaRegMessage } from "react-icons/fa6";
import numeral from "numeral";
import { db } from "../_utils/db";


const getCommentCount = async (postId: string) => {
  const count =  db.comment.count({
    where: {
      postId: Number(postId),
    },
  });
  return count;
};
export default  async function CommentCount({ postId }: { postId: string }) {
  const count =  await getCommentCount(postId);
  return (
    <div className="rounded-full bg-gray-200 flex items-center px-4">
      <FaRegMessage className=" text-lg" />
      <span className=" text-lg ml-4">
        {numeral(count).format("0,0")}
      </span>
    </div>
  );
}
