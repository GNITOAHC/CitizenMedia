'use client'
import React, { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

async function credentials(data: { email: string; password: string }) {
  const result = await signIn('credentials', {
    email: data.email,
    password: data.password,
    redirect: false,
  })
  if (result?.error) {
    console.log(result.error)
    return window.alert('Please check your email and password')
  }
}

async function google() {
  await signIn('google', { redirect: true })
}

export default function Home() {
  const [cred, setCred] = useState({ email: '', password: '' })

  /* Redirect to homepage if user is logged in */
  const { data: session } = useSession()
  if (session) {
    return window.location.replace('/')
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <button onClick={() => google()}>Sign in with Google</button>
      </div>
      <div className="flex flex-col text-black">
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setCred({ ...cred, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setCred({ ...cred, password: e.target.value })}
        />
        <button onClick={() => credentials(cred)}>
          Sign in with Credentials
        </button>
        <Link href="/auth/signin/forget-password">Forget password</Link>
        <p>Create account</p>
      </div>
    </div>
  )
}
