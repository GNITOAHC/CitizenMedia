import { Editor } from '@tiptap/core'
import {
  FaBold,
  FaItalic,
  FaCode,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
} from 'react-icons/fa'

interface Props {
  editor: Editor | null
  className: string
}

const Menubar = ({ editor, className }: Props) => {
  if (!editor) return null

  return (
    <div className={className}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is_active' : ''}
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is_active' : ''}
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is_active' : ''}
      >
        <FaCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is_active' : ''}
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is_active' : ''}
      >
        <FaListOl />
      </button>
      <p> | </p>
      <button onClick={() => editor.chain().focus().undo().run()}>
        <FaUndo />
      </button>
      <button onClick={() => editor.chain().focus().redo().run()}>
        <FaRedo />
      </button>
      <style jsx>
        {`
          button {
            margin: 3px;
          }
          button.is_active {
            background: rgb(197, 197, 197);
          }
          @media (prefers-color-scheme: dark) {
            button.is_active {
              background: rgb(48, 48, 48);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Menubar
