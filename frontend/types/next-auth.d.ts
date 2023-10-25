import NextAuth, { DefaultSession } from 'next-auth'

enum LoginType {
  CREDENTIALS = 'credentials',
  GOOGLE = 'google',
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string
      jwt_token?: string
      avatar?: string
      login_type?: LoginType
    } & DefaultSession['user']
  }
  interface User {
    name?: string
    email?: string

    id?: string
    jwt_token?: string
    avatar?: string
    login_type?: LoginType
  }
  interface Account {
    user: {
      id?: string
      jwt_token?: string
      avatar?: string
      login_type?: LoginType
    }
  }
}
