'use client'
import React from 'react'
import Image from 'next/image'
import Library from './Library'
import Stories from './Stories'
import Userbar from './Userbar'
import Link from 'next/link'

import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  const [library, setLibrary] = React.useState('btn') // Default to library
  const [stories, setStories] = React.useState('btn btn-outline')

  function toggle_lib() {
    setLibrary('btn')
    setStories('btn btn-outline')
  }
  function toggle_stories() {
    setLibrary('btn btn-outline')
    setStories('btn')
  }

  return (
    <main className="flex min-h-screen justify-between p-24 space-x-24">
      <div className="w-8/12">
        <section className="flex flex-row items-center">
          <Image
            src={session?.user.avatar as string}
            alt="image"
            width="130"
            height="130"
            className="rounded-full m-3.5"
          />
          <p className="text-4xl font-bold flex m-3.5">{session?.user?.name}</p>
        </section>
        <section className="flex flex-row justify-end">
          <button className={library} onClick={() => toggle_lib()}>
            Library
          </button>
          <button className={stories} onClick={() => toggle_stories()}>
            Stories
          </button>
        </section>
        <hr />
        {library === 'btn' ? (
          <Library className="" />
        ) : (
          <Stories className="max-h-80 overflow-auto" />
        )}
        <Link href="/user/new-story" className="btn btn-circle">
          +
        </Link>
      </div>
      <div className="w-4/12">
        <Userbar />
      </div>
    </main>
  )
}
