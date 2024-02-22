import React from "react";
import Link from "next/link";
function Header() {
  return (
    <header className="flex justify-between  md:justify-around items-center shadow-lg bg-gray-50 p-5">
      <Link href="/">
      <h1 className="text-md md:text-3xl font-bold mb-4 md:mb-0">
        Study Group
      </h1>
      </Link>
      <nav className="flex items-center gap-4 md:gap-10 text-sm md:text-xl">
        <Link
          href="/profile"
          className="transition-colors duration-300 ease-in-out hover:text-gray-400 font-semibold "
        >
          Profile
        </Link>
        <Link
          href="/groups"
          className="transition-colors duration-200 ease-in-out hover:text-gray-400 font-semibold "
        >
          Browse Groups
        </Link>
        <Link
          href="/signup"
          className="text-white bg-emerald-400 px-5 py-2 transition-colors duration-200 ease-in-out hover:text-gray-600 font-semibold "
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}

export default Header;
