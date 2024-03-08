import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <footer className="bg-slate-900 text-white text-center p-4 mt-4 ">
      <Link href="/contact" className="hover:text-gray-600">
        Contact
      </Link>
    </footer>
  );
}

export default Footer;
