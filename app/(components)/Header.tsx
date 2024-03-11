import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function Header() {
  const session = await getServerSession(options);

  return (
    <header className="flex justify-between  md:justify-around items-center shadow-lg  p-3">
      <Link href="/">
        <h1 className="text-md md:text-3xl font-bold mb-4 md:mb-0">
          Study Group
        </h1>
      </Link>
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
