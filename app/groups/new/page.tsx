import React from "react";
import createGroup from "../../actions/actions";
function NewGroup() {
  return (
    <div className="flex flex-col items-center justify-center  mx-auto p-6  h-screen bg-gray-100">
      <form
        action={createGroup}
        className="space-y-4  bg-white shadow-lg py-20 px-16 rounded-xl"
      >
        <h1 className="text-2xl font-semibold text-gray-500 mb-10">Create a new group</h1>
        <div>
          <label htmlFor="name" className="text-lg font-bold">
            Group Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border-2 border-black rounded-lg"
            maxLength={20}
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
            maxLength={255}
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
