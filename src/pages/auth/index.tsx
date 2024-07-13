import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Auth() {
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    setUser('Ivan')
  }, [])
  if (!user) return <div>Loading...</div>
  return (
    <>
      <Head>
        <title>Home | Instagram Client</title>
      </Head>
      <div>{user}</div>
    </>
  )
}
