'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Logo from '../../public/logo-white.svg'

const Topbar = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <header className="flex flex-row gap-4 w-full items-center bg-white dark:bg-black">
        <Image src={Logo} alt="here was a logo:(" className="h-20" />
        <p>{session.user.email}</p>
        <button onClick={() => signOut()} className="items-end">Sign Out</button>
        <button onClick={() => console.log(session)}>Console</button>
      </header>
    )
  }

  return (
    <header className="flex gap-2">
      <Image src={Logo} alt="here was a logo:(" className="bg-white" />
      <button onClick={() => signIn()} className="items-end text-sky-700">
        Sign in
      </button>
    </header>
  )
}

export default Topbar
