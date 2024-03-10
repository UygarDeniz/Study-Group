"use client"
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import numeral from "numeral";
import { useParams } from "next/navigation";

function PostLikeDislikeButton({ difference, postId }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeDislikeDiff, setLikeDislikeDiff] = useState(difference);

  const params = useParams();
  const { groupId } = params;

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const res = await fetch(
        `/api/groups/${groupId}/posts/${postId}/likeStatus`
      );
      const data = await res.json();
      if (data.likeStatus === "like") {
        setLiked(true);
      } else if (data.likeStatus === "dislike") {
        setDisliked(true);
      }
    };
    fetchLikeStatus();
  }, [postId, groupId]);

  const handleLike = async () => {
    const res = await fetch(
      `/api/groups/${groupId}/posts/${postId}/like`,
      {
        method: "POST",
      }
    );
    if (res.ok) {
      if (disliked) {
        setLikeDislikeDiff(likeDislikeDiff + 2);
      } else if (!liked && !disliked) {
        setLikeDislikeDiff(likeDislikeDiff + 1);
      } else if (liked) {
        setLikeDislikeDiff(likeDislikeDiff - 1);
      }

      setLiked(!liked);
      setDisliked(false);
    }
  };

  const handleDislike = async () => {
    const res = await fetch(
      `/api/groups/${groupId}/posts/${postId}/dislike`,
      {
        method: "POST",
      }
    );
    if (res.ok) {
      if (liked) {
        setLikeDislikeDiff(likeDislikeDiff - 2);
      } else if (!liked && !disliked) {
        setLikeDislikeDiff(likeDislikeDiff - 1);
      } else if (disliked) {
        setLikeDislikeDiff(likeDislikeDiff + 1);
      }

      setDisliked(!disliked);
      setLiked(false);
    }
  };

  return (
    <div
      className={`flex max-w-20  items-center gap-2  px-2 rounded-full border border-black ${
        liked ? "bg-red-500" : disliked ? "bg-violet-500" : "bg-white"
      }`}
    >
      <FaArrowUp
        onClick={handleLike}
        className={` cursor-pointer ${liked ? "text-white" : "text-black"}`}
      />
      <p className={` ${liked || disliked ? "text-white " : "text-black"}`}>
        {numeral(likeDislikeDiff).format(
          likeDislikeDiff % 1000 === 0 || likeDislikeDiff < 1000 ? "0a" : "0.0a"
        )}
      </p>
      <FaArrowDown
        onClick={handleDislike}
        className={` cursor-pointer  ${
          disliked ? "text-white" : "text-black"
        } `}
      />
    </div>
  );
}

export default PostLikeDislikeButton;