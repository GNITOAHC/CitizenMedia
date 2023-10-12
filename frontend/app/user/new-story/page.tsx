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
import Tags from '@yaireo/tagify/dist/react.tagify'
import '@yaireo/tagify/dist/tagify.css'
import Image from '@tiptap/extension-image'

import editorStyles from './editor.module.css'
import { imageDropHandler } from './imageDropHandler'

interface storyData {
  title: string
  subTitle: string
  content: string
}

const Home = () => {
  const { data: session } = useSession()

  const [storyData, setStoryData] = useState<storyData>({
    title: '',
    subTitle: '',
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hello World! 🌎️"}]}]}',
  })
  const [tags, setTags] = useState<{ tags: string[] }>({ tags: [] })

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
        id: session?.user.id,
        ...storyData,
        ...tags,
      },
      session?.user.jwt_token as string
    )
    console.log(response.data)
    if (response.data.message === 'Story created') {
      window.alert('Story created')
      window.location.href = `/stories/${response.data.newStoryId}`
    }
  }
  const handleSave = async () => {
    /* TODO: handle save */
    console.log('save')
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: { class: 'list-decimal' },
        },
        bulletList: {
          HTMLAttributes: { class: 'list-disc' },
        },
      }),
      Image,
    ],
    editorProps: {
      /* handleDrop: imageDropHandler, */
    },
    content: '<p>Hello World! 🌎️</p>',
    onUpdate: ({ editor }) => {
      setStoryData({ ...storyData, content: JSON.stringify(editor.getJSON()) })
    },
  })

  const tagOnChange = React.useCallback((e: any) => {
    const allTags: [] = e.detail.tagify
      .getCleanValue()
      .map((tagifyTags: any) => tagifyTags.value)
    setTags({ tags: allTags })
    /* console.log( */
    /*   'CHANGED:', */
    /*   e.detail.tagify.value, // Array where each tag includes tagify's (needed) extra properties */
    /*   e.detail.tagify.getCleanValue(), // Same as above, without the extra properties */
    /*   e.detail.value // a string representing the tags */
    /* ) */
  }, [])

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
        /* className="list-inside" */
        /* className="min-h-[70vh] p-5 border rounded-md border-black dark:border-white" */
        className={editorStyles.editor}
      />
      <Menubar
        editor={editor}
        className="sticky bottom-20 mt-6 flex justify-center"
      />
      <div className="h-10" />
      <Tags
        onChange={tagOnChange}
        placeholder="tags"
        whitelist={[]}
        settings={{ autoComplete: { enabled: true } }}
      />
      <section className="flex gap-2 m-5 justify-end">
        <button onClick={() => handleSave()}>Save</button>
        <button onClick={() => handlePost()}>Post</button>
      </section>
    </div>
  )
}

export default Home
