import React from "react";
import createGroup from "../../actions/actions";
function NewGroup() {
  return (
    <div className="flex flex-col items-center justify-center mt-20 w-3/5 mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-4">Create a new group</h1>
      <form action={createGroup} className="space-y-4 w-1/2">
        <div>
          <label htmlFor="name" className="text-lg font-bold">
            Group Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border-2 border-black rounded-lg"
            maxLength={50}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="text-lg font-bold">
            Group Description
          </label>
          <textarea
            className="resize-none w-full p-2 border-2 border-black rounded-lg"
            name="description"
            rows={10}
            maxLength={200}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}

export default NewGroup;
