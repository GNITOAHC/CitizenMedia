'use client'
import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Menubar from './Menubar'
import { useSession } from 'next-auth/react'
import { StoryServices } from '@/api/services'

interface storyData {
  title: string
  subTitle: string
  content: string
  tags: string[]
}

const Home = () => {
  const { data: session } = useSession()

  let [storyData, setStoryData] = useState<storyData>({
    title: '',
    subTitle: '',
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hello World! 🌎️"}]}]}',
    tags: [],
  })

  /*
   * req.body = {
   *  email: string,
   *  title: string,
   *  subTitle: string,
   *  content: string,
   *  tags: string[],
   * }
   */

  const handlePost = async () => {
    // Check if all the fields are filled
    if (
      storyData.title === '' ||
      storyData.subTitle === '' ||
      storyData.content === ''
    ) {
      window.alert('Please fill all the fields')
      return
    }
    // Post the story
    const response = await StoryServices.newStory(
      {
        email: session?.user.email,
        ...storyData,
      },
      session?.user.jwt_token as string
    )
    console.log(response)
  }
  const handleSave = async () => {
    console.log('save')
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      ListItem,
      OrderedList.configure({ HTMLAttributes: { class: 'list-decimal' } }),
      BulletList.configure({ HTMLAttributes: { class: 'list-disc' } }),
    ],
    content: '<p>Hello World! 🌎️</p>',
    onUpdate: ({ editor }) => {
      setStoryData({ ...storyData, content: JSON.stringify(editor.getJSON()) })
    },
  })

  return (
    <div className="flex flex-col gap-2 m-10">
      <section className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => {
            setStoryData({ ...storyData, title: e.target.value })
          }}
          className="w-64 text-black"
        />
        <input
          type="text"
          placeholder="Subtitle"
          onChange={(e) => {
            setStoryData({ ...storyData, subTitle: e.target.value })
          }}
          className="w-64 text-black"
        />
      </section>
      <EditorContent
        editor={editor}
        className="min-h-[70vh] p-5 border rounded-md border-black dark:border-white"
      />
      <Menubar
        editor={editor}
        className="sticky bottom-20 mt-6 flex justify-center"
      />
      <div className="h-10" />
      <input type="text" placeholder="Tags" className="w-64 text-black" />
      <section className="flex gap-2 m-5 justify-end">
        <button onClick={() => handleSave()}>Save</button>
        <button onClick={() => handlePost()}>Post</button>
      </section>
    </div>
  )
}

export default Home
