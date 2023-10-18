'use client'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:8080'

async function sendMail(email: string) {
  const result = await axios.post(API_URL + '/auth/forget-password', {
    email: email,
  })
  console.log('result')
  console.log(result)
  if (result.data.message === 'User not found') window.alert('User not found')
  else {
    window.alert('Email sent')
    return window.location.replace('/auth/signin')
  }
}

export default function Home() {
  const [email, setEmail] = useState('')

  /* Redirect to homepage if user is logged in */
  const { data: session } = useSession()
  if (session) return window.location.replace('/')

  return (
    <div className="flex flex-col text-black">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => sendMail(email)}>Send reset password email</button>
    </div>
  )
}
