"use client";
import { useState } from "react";
import { createComment } from "../actions/actions";
import { useFormStatus } from "react-dom";
type NewCommentProps = {
  postId: string;
  groupId: string;
};

function NewComment({ postId, groupId }: NewCommentProps) {
  const [focus, setFocus] = useState(false);
  const [comment, setComment] = useState("");
  const { pending } = useFormStatus();
  const formDataWithPostId = createComment.bind(null, postId, groupId);

  return (
    <form
      action={formDataWithPostId}
      className="mb-2 p-1 border border-black bg-slate-100 text-right rounded-2xl "
    >
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setFocus(true)}
        className="w-full  bg-slate-100 indent-4 mt-0  focus:outline-none  resize-none focus:resize-y"
        placeholder="Write a comment"
        name="comment"
        required
      />
      {focus && (
        <button
          disabled={pending}
          className={
            `bg-black text-white rounded-3xl px-4 py-1 m-2 ` +
            (pending ? "opacity-50" : "")
          }
        >
          Comment
        </button>
      )}
    </form>
  );
}

export default NewComment;
