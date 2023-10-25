import React from 'react'
import Link from 'next/link'
import { StoryServices } from '@/api/services'
import { useSession } from 'next-auth/react'

interface Story {
  _id: string
  author: string
  authorId: string
  content: string
  title: string
  subTitle: string
  createdAt: string
  comments: string[]
  tags: string[]
}

async function myStories(jwt_token: string) {
  const response = await StoryServices.getMyStories(jwt_token)
  /* console.log(response.data) */
  if (!response) return null
  return response.data as Story[]
}

export default function Stories({ className }: { className: string }) {
  const { data: session } = useSession()

  const [data, setData] = React.useState<Story[]>([])

  React.useEffect(() => {
    myStories(session?.user.jwt_token as string).then((res) => {
      if (res) setData(res)
    })
  }, [session])

  if (!session) return <div>loading...</div>
  if (!session.user) return <div>loading...</div>

  return (
    <div className={`${className} overscroll-auto`}>
      <h1>Stories</h1>
      {data.map((story) => (
        <Link
          href={`/stories/${story._id}`}
          key={story._id}
          className="card border-2"
        >
          <div className="card-title">{story.title}</div>
          <p>{story.subTitle}</p>
          <p>{story.createdAt}</p>
        </Link>
      ))}
    </div>
  )
}
