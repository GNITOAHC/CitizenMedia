import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

import type { NextAuthOptions } from 'next-auth'
import type { User } from 'next-auth'

/* 
 * type User = { 
 * name: string, 
 * email: string, 
 * image: string, 
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
        const res = await axios.post(API_URL + '/auth/credentials', {
          email: credentials?.email,
          password: credentials?.password,
        })
        if (res && res.status == 200) {
          let user = {
            name: res.data.name ?? '',
            email: res.data.email ?? '',
            jwt_token: 'Bearer ' + res.data.jwt_token ?? '',
          }
          return user
        } else return null
      },
    }),
  ],
  callbacks: {
    async signIn({ account, user, profile }) {
      if (account && account.provider === 'google') {
        const res = await axios
          .post(API_URL + '/auth/google', { id_token: account.id_token })
          .catch((err) => {
            console.log(err)
          })
        if (res && res.status == 200) {
          account.user = res.data.user as User
          return true
        } else return false
      } else if (account && account.provider === 'credentials') {
        const res = await axios.get(API_URL + '/auth/verify', {
          headers: { Authorization: user.jwt_token },
        })
        if (res && res.data.verified == true) {
          account.user = { ...user } as User
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
  }
}
