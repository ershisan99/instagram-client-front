import Head from 'next/head'
import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import { Loader } from '@/components/loader/loader'
import { useState } from 'react'
import { useGetPublicPostsQuery } from '@/services/inctagram.public-posts.service'

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
  const [pageSize, setPageSize] = useState(4)
  const { data, isLoading, isError, error } = useGetPublicPostsQuery({
    pageSize,
  })
  if (isLoading) {
    return (
      <div className={'w-screen h-screen grid place-items-center'}>
        <Loader />
      </div>
    )
  }

  if (isError) {
    return <div>Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <div>
      <nav>
        <Link href={'/auth/login'}>Login</Link>
      </nav>
      <select value={pageSize} onChange={e => setPageSize(Number.parseInt(e.target.value, 10))}>
        <option value={4}>4</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
      <div className={'grid grid-cols-4 p-6 mx-auto gap-4'}>
        {data?.items?.map(post => {
          return (
            <div key={post.id} className={'w-60'}>
              <img src={post.images[0].url} className={'w-full aspect-square object-cover'} />
              <div className={'flex gap-3 items-center mt-3'}>
                <img
                  src={post.avatarOwner ?? 'https://picsum.photos/200'}
                  className={'size-9 rounded-full object-cover'}
                />
                <div>{post.userName}</div>
              </div>
              <ReactTimeAgo
                date={new Date(post.createdAt)}
                className={'mt-3 text-sm text-gray-500'}
              />
              {post.description && <div className={'mt-4'}>{post.description}</div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
