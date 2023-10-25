// Note: This is a dynamic route
'use client'
import React from 'react'
import { StoryServices } from '@/api/services'
import { generateHTML } from '@tiptap/html'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import parse from 'html-react-parser'

// Use CSS Modules to style story body component
import storyStyles from './story.module.css'

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

export default function Home({ params }: { params: { storyid: string } }) {
  const [data, setData] = React.useState<Story | null>(null)
  const [content, setContent] = React.useState<string | null>(null)

  React.useEffect(() => {
    StoryServices.getStoryById(params.storyid).then((res) => {
      if (res && res.data != 'Story not found') setData(res.data)
    })
  }, [params.storyid])

  React.useEffect(() => {
    setContent(
      generateHTML(
        JSON.parse(
          data?.content ??
            '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Loading..."}]}]}'
        ),
        [StarterKit, Image]
      )
    )
  }, [data?.content])

  return (
    <div className="h-screen">
      <div>My Post: {params.storyid}</div>
      <button onClick={() => console.log(params)}>Click</button>
      {data ? (
        <div className="m-12 border-black border-r-2 border-4">
          <p>Title: {data && data.title}</p>
          <p>Sub Title: {data && data.subTitle}</p>
          <br />
          <div className={storyStyles.content}>{content && parse(content)}</div>
          <br />
          <p>Tags: {data && data.tags.join(', ')}</p>
        </div>
      ) : (
        <p>Story not found</p>
      )}
    </div>
  )
}
