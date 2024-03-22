"use client";
import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import numeral from "numeral";
import { useParams } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function PostLikeDislikeButton({ difference, postId }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeDislikeDiff, setLikeDislikeDiff] = useState(difference);

  const params = useParams();
  const router = useRouter();
  const { groupId } = params;
  const fetchLikeStatus = async (groupId, postId) => {
    const res = await fetch(
      `/api/groups/${groupId}/posts/${postId}/likeStatus`
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  };

  async function dislikePost(groupId, postId) {
    const res = await fetch(`/api/groups/${groupId}/posts/${postId}/dislike`, {
      method: "POST",
    });

    if (res.status === 401) {
      router.push("/api/auth/signin");
    }
    if (!res.ok) {
      const data = await res.json();
      throw new Error(
        data.status === 401 ? "Unauthorized" : "Network response was not ok"
      );
    }

    return res.json();
  }

  async function likePost(groupId, postId) {
    const res = await fetch(`/api/groups/${groupId}/posts/${postId}/like`, {
      method: "POST",
    });

    if (res.status === 401) {
      router.push("/api/auth/signin");
    }
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.messaga);
    }

    return res.json();
  }

  const { data, isPending } = useQuery({
    queryKey: ["likeStatus", groupId, postId],
    queryFn: () => fetchLikeStatus(groupId, postId),
  });

  const dislikeMutation = useMutation({
    mutationFn: () => dislikePost(groupId, postId),
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
    mutationFn: () => likePost(groupId, postId),
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

  async function handleLike() {
    try {
      await likeMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDislike() {
    try {
      await dislikeMutation.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  }

  if (isPending) {
    return (
      <div className="px-7  py-1 rounded-full border border-black ">
        <ImSpinner2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div
      className={`flex max-w-20  items-center gap-2  px-2 rounded-full border border-gray-800 ${
        liked ? "bg-red-500" : disliked ? "bg-violet-500" : "bg-white"
      }`}
    >
      <FaArrowUp
        onClick={handleLike}
        className={` cursor-pointer ${liked ? "text-white" : "text-black"}`}
      />
      <p className={` ${liked || disliked ? "text-white " : "text-gray-800"}`}>
        {numeral(likeDislikeDiff).format(
          likeDislikeDiff % 1000 === 0 || likeDislikeDiff < 1000 ? "0a" : "0.0a"
        )}
      </p>
      <FaArrowDown
        onClick={handleDislike}
        className={` cursor-pointer  ${
          disliked ? "text-white" : "text-gray-800"
        } `}
      />
    </div>
  );
}

export default PostLikeDislikeButton;
