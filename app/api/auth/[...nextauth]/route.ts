import NextAuth from "next-auth/next";
import { options } from "./options";
import { NextApiHandler } from "next";

const handler: NextApiHandler = NextAuth(options);
export { handler as GET, handler as POST };
