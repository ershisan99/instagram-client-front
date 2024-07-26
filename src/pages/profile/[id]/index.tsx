import { useRouter } from 'next/router'
import Link from 'next/link'

export default function UserProfile() {
  const router = useRouter()
  const id = router.query.id

  return (
    <div>
      Profile for user with id {id}
      <Link href={'/profile/edit'}>Edit Profile</Link>
    </div>
  )
}
