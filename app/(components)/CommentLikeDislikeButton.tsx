"use client";
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import numeral from "numeral";
import { useParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { useQuery, useMutation } from "@tanstack/react-query";

const fetchLikeStatus = async (groupId, postId, commentId) => {
  const res = await fetch(
    `/api/groups/${groupId}/posts/${postId}/comments/${commentId}/likeStatus`
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await res.json();
  return data;
};

const dislikeComment = async (groupId, postId, commentId) => {
  const res = await fetch(
    `/api/groups/${groupId}/posts/${postId}/comments/${commentId}/dislike`,
    {
      method: "POST",
    }
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};
const likeComment = async (groupId, postId, commentId) => {
  const res = await fetch(
    `/api/groups/${groupId}/posts/${postId}/comments/${commentId}/like`,
    {
      method: "POST",
    }
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

function LikeDislikeButton({ difference, commentId }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeDislikeDiff, setLikeDislikeDiff] = useState(difference);

  const params = useParams();
  const { groupId, postId } = params;

  const { data, isPending } = useQuery({
    queryKey: ["likeStatus", groupId, postId, commentId],
    queryFn: () => fetchLikeStatus(groupId, postId, commentId),
    staleTime: 1000 * 60 * 5,
  });

  const dislikeMutation = useMutation({
    mutationFn: () => dislikeComment(groupId, postId, commentId),
    onSuccess: () => {
      if (liked) {
        setLikeDislikeDiff(likeDislikeDiff - 2);
      } else if (!liked && !disliked) {
        setLikeDislikeDiff(likeDislikeDiff - 1);
      } else if (disliked) {
        setLikeDislikeDiff(likeDislikeDiff + 1);
      }

      setDisliked(!disliked);
      setLiked(false);
    },
  });

  useEffect(() => {
    if (data) {
      if (data.likeStatus === "like") {
        setLiked(true);
      } else if (data.likeStatus === "dislike") {
        setDisliked(true);
      }
    }
  }, [data]);

  const likeMutation = useMutation({
    mutationFn: () => likeComment(groupId, postId, commentId),
    onSuccess: () => {
      if (disliked) {
        setLikeDislikeDiff(likeDislikeDiff + 2);
      } else if (!liked && !disliked) {
        setLikeDislikeDiff(likeDislikeDiff + 1);
      } else if (liked) {
        setLikeDislikeDiff(likeDislikeDiff - 1);
      }

      setLiked(!liked);
      setDisliked(false);
    },
  });

  const handleLike = async () => {
    likeMutation.mutate();
  };

  const handleDislike = async () => {
    dislikeMutation.mutate();
  };
  if (isPending) {
    return (
      <div className="px-8 w-16 py-1 rounded-full border border-black text-center">
        <ImSpinner2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-2  px-2 rounded-full border border-black ${
        liked ? "bg-red-500" : disliked ? "bg-violet-500" : "bg-white"
      }`}
    >
      <FaArrowUp
        onClick={handleLike}
        className={` cursor-pointer ${liked ? "text-white" : "text-gray-700"}`}
      />
      <p className={` ${liked || disliked ? "text-white " : "text-gray-700"}`}>
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

export default LikeDislikeButton;
