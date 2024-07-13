import Head from 'next/head'
import { useController, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/input'
import { Checkbox } from '@/components/checkbox'
import { FormCheckbox } from '@/form/form-checkbox'
import { FormInput } from '@/form/form-input'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  rememberMe: z.boolean().optional(),
})

type LoginFields = z.infer<typeof loginSchema>

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <>
      <Head>
        <title>Login | Instagram Client</title>
      </Head>
      <form onSubmit={onSubmit}>
        <FormInput name={'email'} control={control} label={'Email'} disabled />
        <FormInput name={'password'} control={control} label={'Password'} type={'password'} />

        <FormCheckbox
          control={control}
          name={'rememberMe'}
          label={
            <span>
              I agree to the{' '}
              <a className={'hover:underline text-sky-500'} href={'#'}>
                Terms of Service and Privacy Policy
              </a>
            </span>
          }
        />
        <button>Send</button>
      </form>
    </>
  )
}
