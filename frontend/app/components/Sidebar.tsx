import React from 'react'
import Link from 'next/link'

interface SidebarItemProps {
  href: string
  display: string
  setOpen: any
}

function SidebarItem({ href, display, setOpen }: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="btn btn-primary"
        onClick={() => setOpen(false)}
      >
        {display}
      </Link>
    </li>
  )
}

export default function Sidebar() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="drawer drawer-end w-10 justify-self-end z-0">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => setOpen(!open)}
      />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <SidebarItem href="/" setOpen={setOpen} display="Home" />
          <SidebarItem href="/user" setOpen={setOpen} display="User" />
          <SidebarItem href="/settings" setOpen={setOpen} display="Settings" />
        </ul>
      </div>
    </div>
  )
}
