import { NextAuthOptions } from "next-auth";
import prisma from "@prisma/prisma-client";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

type CredentialType = {
  email: string;
  password: string;
};

const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials as CredentialType;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) throw new Error("User not found");
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) throw new Error("Password is incorrect");

        return {
          id: user.id,
          email: user.email,
          name: user.user_name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
};

export default NextAuth(authOption);
