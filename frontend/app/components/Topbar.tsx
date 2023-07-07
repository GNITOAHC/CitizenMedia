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
        <Image
          src={session.user.image as string}
          alt={session.user.name as string}
          width={100}
          height={100}
          className="rounded-full h-14 w-14"
        />
        <button onClick={() => signOut()} className="items-end">Sign Out</button>
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
