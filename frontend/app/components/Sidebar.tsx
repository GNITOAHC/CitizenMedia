import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import Logo from '../../public/logo-white.svg'

interface SidebarItemProps {
  href: string
  children: any
  setOpen: any
}

function SidebarItem({ href, children, setOpen }: SidebarItemProps) {
  return (
    <li>
      <Link
        href={href}
        className="text-white text-xl font-normal"
        onClick={() => setOpen(false)}
      >
        {children}
      </Link>
    </li>
  )
}

export default function Sidebar() {
  const { data: session } = useSession()
  const [open, setOpen] = React.useState(false)

  return (
    <div className="drawer drawer-end w-10 ml-auto mr-3 z-0">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={() => setOpen(!open)}
      />
      <div className="drawer-content">
        {/* Page content here */}
        {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary"> */}
        <label htmlFor="my-drawer-4" className="drawer-button">
          {/* Open drawer */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="43"
            viewBox="0 0 40 43"
            fill="none"
          >
            <path
              d="M35 17.6191H5"
              stroke="#466D9E"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M35 10.5723H5"
              stroke="#466D9E"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M35 24.666H5"
              stroke="#F8B61C"
              stroke-opacity="0.64"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M35 31.7148H5"
              stroke="#466D9E"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-menu_blue text-base-content">
          {/* Sidebar content here */}
          <div className="flex flex-col justify-end items-start h-40">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-end h-full mb-3">
                <img
                  src={session?.user?.avatar as string}
                  alt="here was a logo:("
                  width={30}
                  height={30}
                  className="rounded-full w-16 h-16 m-1"
                />
                <div className="w-full relative">
                  <div className="flex w-full">
                    <span
                      className="ml-4 justify-end m-1 mb-1 text-xl font-bold text-white"
                      style={{ zIndex: 1 }}
                    >
                      User&#160;
                    </span>
                    <p
                      className="justify-end m-1 mr-3 mb-1 text-xl font-bold text-white"
                      style={{ zIndex: 1 }}
                    >
                      {session?.user?.name}
                    </p>
                  </div>
                  <span className="bottom-1 right-0 absolute bg-amber-400 w-10 h-2.5 dark:border-gray-800" />
                </div>
              </div>
            </div>
          </div>
          <SidebarItem href="/" setOpen={setOpen} children="Home" />
          <hr className="h-0.5 my-1 bg-menu_line border-0 dark:bg-gray-700 ml-4 mr-10"></hr>
          <SidebarItem href="/user" setOpen={setOpen} children="User" />
          <hr className="h-0.5 my-1 bg-menu_line border-0 dark:bg-gray-700 ml-4 mr-10"></hr>
          <SidebarItem href="/" setOpen={setOpen} children="Notifications" />
          <hr className="h-0.5 my-1 bg-menu_line border-0 dark:bg-gray-700 ml-4 mr-10"></hr>
          <SidebarItem href="/settings" setOpen={setOpen} children="Settings" />
          <hr className="h-0.5 my-1 bg-menu_line border-0 dark:bg-gray-700 ml-4 mr-10"></hr>
          <div className="flex items-center mt-3 ml-2">
            <button
              onClick={() => signOut()}
              className="flex items-center mt-6 ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="41"
                viewBox="0 0 43 49"
                fill="none"
                className="ml-5"
              >
                <path
                  d="M19.7227 24.5007H41.2227M41.2227 24.5007L32.0084 31.6673M41.2227 24.5007L32.0084 17.334"
                  stroke="#FBB51F"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M36.4444 10.1667V7.77778C36.4444 5.13908 34.3054 3 31.6667 3H7.77778C5.13908 3 3 5.13908 3 7.77778V41.2222C3 43.861 5.13908 46 7.77778 46H31.6667C34.3054 46 36.4444 43.861 36.4444 41.2222V38.8333"
                  stroke="white"
                  stroke-width="5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="mt-auto ml-2 text-white text-lg">Log out</span>
            </button>
          </div>
          <div className="flex items-center h-40 w-full mt-6 ml-2">
            <Image
              src={Logo}
              alt="here was a logo:("
              className="h-12 ml-auto mb-1 mr-1"
            />
          </div>
        </ul>
      </div>
    </div>
  )
}
