import React from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
async function handleSearch(formData: FormData) {
  "use server";
  const name = formData.get("search") as string;
  redirect(`/groups?name=${name}`);
}
async function Header() {
  const session = await getServerSession(options);

  return (
    <header className="flex justify-between  md:justify-around items-center shadow-lg  p-3">
      <Link href="/">
        <h1 className="text-md md:text-3xl font-bold">Study Group</h1>
      </Link>

      <form
        action={handleSearch}
        className="flex justify-center items-center  relative"
      >
        <input
          type="text"
          placeholder="Search"
          name="search"
          className="peer  focus:outline-none px-6 py-2 border-2 border-gray-300 rounded-full md:w-[500px]  w-[200px] hover:bg-gray-300 ease-in-out duration-500 "
          required
        />
        <button className="peer-hover:text-red-600 ease-in-out duration-500 py-2 h-full absolute right-4">
          <FaSearch />
        </button>
      </form>
      <nav className="flex items-center gap-4 md:gap-10 text-sm md:text-xl">
        {session?.user && (
          <Link
            href="/profile"
            className="transition-colors duration-300 ease-in-out hover:text-red-400 font-semibold "
          >
            Profile
          </Link>
        )}
        <Link
          href="/groups"
          className="transition-colors duration-200 ease-in-out hover:text-red-400 font-semibold "
        >
          Browse Groups
        </Link>

        {session?.user ? (
          <Link
            href="/api/auth/signout"
            className="border-red-500 border-2 px-5 py-2 transition-colors duration-200 ease-in-out hover:bg-red-500 hover:text-white font-semibold "
          >
            Log Out
          </Link>
        ) : (
          <Link
            href="/signup"
            className="border-red-500 border-2 px-5 py-2 transition-colors duration-200 ease-in-out hover:bg-red-500 hover:text-white font-semibold "
          >
            Sign Up
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
