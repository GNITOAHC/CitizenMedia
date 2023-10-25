'use client'
import React from 'react'
import Account from './Account'
import Security from './Security'
import Notification from './Notification'
import Workspace from './Workspace'

export default function Page() {
  const activeStyle = 'btn btn-primary scale-105'
  const inactiveStyle = 'btn'
  const [account, setAccount] = React.useState(activeStyle) // Default to account
  const [security, setSecurity] = React.useState(inactiveStyle)
  const [notification, setNotification] = React.useState(inactiveStyle)
  const [workspace, setWorkspace] = React.useState(inactiveStyle)

  function toggleAccount() {
    setAccount(activeStyle)
    setSecurity(inactiveStyle)
    setNotification(inactiveStyle)
    setWorkspace(inactiveStyle)
  }
  function toggleSecurity() {
    setAccount(inactiveStyle)
    setSecurity(activeStyle)
    setNotification(inactiveStyle)
    setWorkspace(inactiveStyle)
  }
  function toggleNotification() {
    setAccount(inactiveStyle)
    setSecurity(inactiveStyle)
    setNotification(activeStyle)
    setWorkspace(inactiveStyle)
  }

  function toggleWorkspace() {
    setAccount(inactiveStyle)
    setSecurity(inactiveStyle)
    setNotification(inactiveStyle)
    setWorkspace(activeStyle)
  }

  return (
    <main className="min-h-screen">
      <p className="text-2xl">Settings</p>
      <section className="flex flex-row m-4 space-x-4">
        <button className={account} onClick={toggleAccount}>
          Account
        </button>
        <button className={security} onClick={toggleSecurity}>
          Security
        </button>
        <button className={notification} onClick={toggleNotification}>
          Notification
        </button>
        <button className={workspace} onClick={toggleWorkspace}>
          Workspace
        </button>
      </section>
      <hr className="h-[3px] bg-divider mx-16 my-5" />
      {account === activeStyle && <Account />}
      {security === activeStyle && <Security />}
      {notification === activeStyle && <Notification />}
      {workspace === activeStyle && <Workspace />}
    </main>
  )
}
