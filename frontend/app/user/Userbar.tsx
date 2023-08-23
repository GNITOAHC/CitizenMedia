'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { UserServices } from '@/api/services'

export default function Userbar() {
  const { data: session, status } = useSession()
  const username = session?.user?.name

  const [profile, setProfile] = React.useState({} as { [key: string]: string })

  React.useEffect(() => {
    const getProfileLinks = async () => {
      await UserServices.getProfileLinks(
        session?.user.jwt_token as string
      ).then((res) => {
        setProfile(res.data.profileLinks as { [key: string]: string })
      })
    }
    getProfileLinks()
  }, [status])

  return (
    <div>
      <section className="border-2">
        <div className="flex flex-row justify-between">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={session?.user.avatar} alt="avatar" />
            </div>
            <p>User {username}</p>
          </div>
        </div>
        <div className="flex">Links to profile, settings, etc.</div>
        {profile &&
          Object.entries(profile).map(([key, value]) => {
            return (
              <div key={key} className="flex flex-row">
                <p className="pr-2">{key}</p>
                <p>{value}</p>
              </div>
            )
          })}
      </section>
    </div>
  )
}
