'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

/* import Services from '../api/services' */

const API_URL = 'http://localhost:8080'

interface params {
  id: string
  token: string
  pass: string
  confirm: string
}

async function resetPass({ id, token, pass, confirm }: params) {
  if (pass !== confirm) {
    window.alert('passwords do not match')
  } else {
    /* await Services.resetPass(id, token, pass) */
    const res = await axios.post(`${API_URL}/auth/reset-password`, {
      id: id,
      password: pass,
      token: token,
    })
    if (res.status === 200) {
      window.alert(res.data.message)
      return window.location.replace('/auth/signin')
    } else {
      window.alert(res.data.message)
    }
  }
}

export default function Home() {
  const query = useSearchParams()
  const id = query.get('id') ?? ''
  const token = query.get('token') ?? ''

  const [pass, setPass] = useState('')
  const [confirm, setConfirm] = useState('')

  /* Redirect to homepage if user is logged in */
  const { data: session } = useSession()
  if (session) return window.location.replace('/')

  return (
    <section className="text-black h-screen flex flex-col gap-2 m-12">
      <button onClick={() => console.log(id, token)}>Console</button>
      <input
        type="text"
        placeholder="new password"
        onChange={(e) => setPass(e.target.value)}
      />
      <input
        type="text"
        placeholder="confirm"
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button onClick={() => resetPass({ id, token, pass, confirm })}>
        Submit
      </button>
    </section>
  )
}
