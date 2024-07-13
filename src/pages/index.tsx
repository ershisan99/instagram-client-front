import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Instagram Client</title>
      </Head>
      <Content />
    </>
  )
}

function Content() {
  return (
    <div>
      <nav>
        <Link href={'/auth/login'}>Login</Link>
      </nav>
    </div>
  )
}
