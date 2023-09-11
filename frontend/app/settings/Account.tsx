'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

export default function Account() {
  return (
    <section className="flex flex-row gap-x-2">
      <section className="flex flex-col">
        <UserImageAndName />
        <UserIntroduction />
      </section>
      <section>
        <p>facebook: </p>
        <p>instagram: </p>
        <p>twitter: </p>
        <p>linkedin: </p>
        <p>line: </p>
      </section>
    </section>
  )
}

// User image and name
function UserImageAndName() {
  const { data: session } = useSession()
  console.log(session)

  if (session && session.user) {
    return (
      <section className="flex flex-row">
        <img
          src={session?.user.avatar as string}
          alt="user image"
          width={200}
          height={200}
        />
        <p>{session?.user.name}</p>
      </section>
    )
  }
}

// User Introduction
function UserIntroduction() {
  return (
    <section className="flex flex-col">
      <p>Introduction:</p>
      <textarea
        className="textarea textarea-bordered"
        placeholder="Textarea"
      ></textarea>
    </section>
  )
}
