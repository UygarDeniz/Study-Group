import CredentialsProvider from "next-auth/providers/credentials";
import bcrpyt from "bcrypt";
import { PrismaClient } from "@prisma/client";
export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const prisma = new PrismaClient();
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (user) {
            const passwordsMatch = await bcrpyt.compare(
              credentials.password,
              user.password
            );

            if (passwordsMatch) {
              return {
                id: user.id,
                name: user.name,
              };
            }
          }
        } catch (error) {
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};
