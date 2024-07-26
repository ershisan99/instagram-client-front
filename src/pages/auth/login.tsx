import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormInput } from '@/form/form-input'
import { useLoginMutation } from '@/services/inctagram.auth.service'
import { useRouter } from 'next/router'
import { useLazyGetUserProfileQuery } from '@/services/inctagram.profile.service'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
})

type LoginFields = z.infer<typeof loginSchema>

export default function Login() {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  const [login] = useLoginMutation()
  const [getProfile, profile] = useLazyGetUserProfileQuery()
  const onSubmit = handleSubmit(data =>
    login(data)
      .unwrap()
      .then(async ({ accessToken }) => {
        localStorage.setItem('token', accessToken)
        const { data } = await getProfile()
        if (!data) {
          return
        }
        void router.push(`/profile/${data?.id}`)
      })
  )

  return (
    <>
      <Head>
        <title>Login | Instagram Client</title>
      </Head>
      <form onSubmit={onSubmit}>
        <FormInput name={'email'} control={control} label={'Email'} />
        <FormInput name={'password'} control={control} label={'Password'} type={'password'} />
        <button>Send</button>
      </form>
    </>
  )
}
