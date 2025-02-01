import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: number | null;
      role?: 'USER' | 'ADMIN';
    } & DefaultSession['user'];
  }

  export interface User extends DefaultUser {
    id?: number;
    role?: UserRole;
  }
}
