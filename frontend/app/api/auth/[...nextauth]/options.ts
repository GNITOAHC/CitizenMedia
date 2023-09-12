import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

import type { NextAuthOptions } from 'next-auth'
import type { User } from 'next-auth'

/*
 * type User = {
 * name: string,
 * email: string,
 * avatar: string,
 * id: string,
 * jwt_token: string,
 * }
 */

const API_URL = process.env.API_URL ?? 'http://localhost:8080'

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return { email: credentials?.email, password: credentials?.password }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, credentials }) {
      if (account && account.provider === 'google') {
        const res = await axios
          .post(API_URL + '/auth/google', { id_token: account.id_token })
          .catch((err) => {
            console.log(err)
          })
        if (res && res.status == 200) {
          account.user = res.data as User
          return true
        } else return false
      } else if (account && account.provider === 'credentials') {
        const res = await axios
          .post(API_URL + '/auth/credentials', {
            email: credentials?.email,
            password: credentials?.password,
          })
          .catch((err) => {
            console.log(err)
          })
        if (res && res.status == 200) {
          account.user = res.data as User
          return true
        } else return false
      }
      return false
    },
    async session({ session, token }) {
      session.user = token.user as User
      return session
    },
    async jwt({ token, account }) {
      if (account) token.user = account.user as User
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
}
