import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string
      jwt_token?: string
    } & DefaultSession['user']
  }
  interface User {
    name?: string
    email?: string
    image?: string
    id?: string
    jwt_token?: string
  }
  interface Account {
    user: {
      id?: string
      jwt_token?: string
    }
  }
}
