import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import {NextResponse} from "next/server";
import {notFound} from "next/navigation";

const ADMIN_PROTECTED_PATHS = [/\/dashboard\/(.*)/]
const USER_PROTECTED_PATHS = [
  /\/cart/,
  /\/profile\/(.*)?/,
  /\/order\/(.*)/
]
const AUTH_PUBLIC_PATHS = [
  /\/login\/(.*)/,
  /\/signup\/(.*)/
]
const ADMIN_HOST = process.env.NEXT_PUBLIC_ADMIN_ROOT_DOMAIN;
const USER_HOST = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
const USER_DEFAULT_PATH = "/";
const ADMIN_DEFAULT_PATH = "/dashboard";

const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      const hostName = request.headers.get('host');
      if (!hostName) {
        return NextResponse.redirect(new URL(USER_DEFAULT_PATH, USER_HOST));
      }
      if(!auth && USER_PROTECTED_PATHS.some((path) => path.test(pathname))) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      else if (!auth) {
        return true;
      }
      else if (auth.user.role === 'USER') {
        if(AUTH_PUBLIC_PATHS.some((path) => path.test(pathname))) {
          return NextResponse.redirect(new URL(USER_DEFAULT_PATH, request.url));
        }
      } else if (auth.user.role === 'ADMIN') {
        // if(hostName === USER_HOST) {
        //   hostName = hostName.replace(USER_HOST, ADMIN_HOST || 'http://admin.localhost:3000');
        //   request.headers.set('host', hostName);
        // }
        if(AUTH_PUBLIC_PATHS.some((path) => path.test(pathname))) {
          return NextResponse.redirect(new URL(ADMIN_DEFAULT_PATH, request.url));
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)',
  ],
};
