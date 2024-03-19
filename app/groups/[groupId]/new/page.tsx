import { FaTimes } from "react-icons/fa";
import { createPost } from "@/app/actions/actions";

function NewPost({ params }) {
  const { groupId } = params;

  const formDataWithGroupId = createPost.bind(null, groupId);
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white px-2 py-6 sm:p-20 w-full md:w-[600px] rounded-2xl shadow-lg">
        <div className="block pl-2 font-semibold text-xl text-gray-700">
          <h2 className="leading-relaxed">Create Post</h2>
          <p className="text-sm text-gray-500 font-normal">
            Share your thoughts with the group.
          </p>
        </div>
        <form className="space-y-6 py-8" action={formDataWithGroupId}>
          <div className="relative">
            <input
              type="text"
              name="title"
              className="w-full border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
              required
              maxLength={20}
            />
            <label
              htmlFor="title"
              className="absolute left-3 top-0 text-gray-600 text-md"
            >
              Title
            </label>
          </div>
          <div className="relative">
            <textarea
              name="content"
              className="w-full border-2 py-8 px-2 border-gray-800 text-gray-900 focus:outline-none focus:border-rose-600"
              rows={7}
              required
              maxLength={255}
            />
            <label
              htmlFor="content"
              className="absolute left-3 top-0 text-gray-600 text-md"
            >
              Content
            </label>
          </div>
          <button className="border border-black px-4 py-3 text-white  w-full bg-black">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
