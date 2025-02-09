import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import NextAuth, {User} from "next-auth";
import type {Session} from "@auth/core/types";
import {JWT} from "@auth/core/jwt";

export const userAuth = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: 'email',
        },
        password: {
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (credentials === null) return null;

        const response = await fetch(`${process.env.BASE_URL}/api/auth/user?email=${credentials.email}`);
        const user =  await response.json();
        if (user) {
          const isMatch = await bcrypt.compare(
              credentials.password as string,
              user.password,
          );
          console.log("===========================user",user);
          if (isMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  // custom pages for sign in and register
  pages: {
    signIn: '/login',
    newUser: '/signup',
    error: '/error',
  },
  callbacks: {
    async jwt({ user, trigger, session, token }) {
      console.log("============================jwtUser",user)
      if (user) {
        token.user = {
          _id: user.userId,
          email: user.email,
          role: 'USER'
        };
      }
      console.log("============================jwt",token.user);
      if (trigger === 'update' && session) {
        token.user = {
          ...token.user as object,
          email: session.user.email,
        };
      }
      return token;
    },
    session: async ({ session, token }:{
      session: Session;
      token: JWT;
    }) => {
      console.log("============================session",token.user);
      if (token) {
        session.user = token.user as { id?: number | null; role?: 'USER' | 'ADMIN' } & User;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt'
  }
})
