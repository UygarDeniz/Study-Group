import React from "react";
import Link from "next/link";
function Footer() {
  return (
    <footer className="bg-gray-50 text-center p-5 ">
      <div className="container mx-auto">
        <p className="mb-4">© 2024 Study Group. All rights reserved.</p>
        <nav className="flex justify-center space-x-4">
          <Link href="/contact" className="hover:text-gray-600">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
