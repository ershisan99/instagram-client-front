import {
  useLazyGetUserProfileQuery,
  useUpdateUserAvatarMutation,
  useUpdateUserProfileMutation,
} from '@/services/inctagram.profile.service'
import { FormInput } from '@/form/form-input'
import { useForm } from 'react-hook-form'
import { UpdateUserProfileArgs } from '@/services/inctagram.types'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'
import { FormTextarea } from '@/form/form-textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { profileSchema, UserProfile } from '@/validation/schemas/profile-schema'
import { format } from '@formkit/tempo'

export default function Profile() {
  const [file, setFile] = useState<File | null>(null)

  const [getProfile, profile] = useLazyGetUserProfileQuery()
  const [mutate, { isLoading }] = useUpdateUserProfileMutation()
  const [uploadImage, { isLoading: loadingImage }] = useUpdateUserAvatarMutation()

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: async () => {
      const { data } = await getProfile()

      if (!data) {
        return {} as UpdateUserProfileArgs
      }

      const dateOfBirth = data?.dateOfBirth

      return {
        ...data,
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        dateOfBirth: dateOfBirth ? format(dateOfBirth, 'YYYY-MM-DD') : undefined,
        aboutMe: data.aboutMe ?? '',
      }
    },
  })

  const onSubmit = handleSubmit(data =>
    toast.promise(mutate(data).unwrap(), {
      loading: 'Loading...',
      success: data => {
        return 'Profile updated successfully'
      },
      error: 'Error updating profile',
    })
  )

  const handleAvatarFormSubmitted = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      return
    }
    uploadImage({ file })
      .unwrap()
      .then(() => {
        toast.success('Avatar updated successfully')
        getProfile()
      })
  }

  const handleFileInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.currentTarget.files?.[0] ?? null)
  }

  return (
    <div>
      Profile
      <h1 className={'text-xl font-medium'}>{profile.data?.userName}</h1>
      <h2 className={'text-lg font-medium'}>
        {profile.data?.firstName} {profile.data?.lastName}
      </h2>
      <img src={profile.data?.avatars?.[0].url} className={'rounded-full'} alt={'user profile'} />
      <form onSubmit={onSubmit}>
        <FormInput name={'userName'} control={control} label={'User name'} />
        <FormInput name={'firstName'} control={control} label={'First name'} />
        <FormInput name={'lastName'} control={control} label={'Last name'} />
        <input type={'date'} {...register('dateOfBirth')} />
        {!!errors.dateOfBirth && <UnderageUserError />}
        <FormInput name={'city'} control={control} label={'City'} />
        <FormInput name={'country'} control={control} label={'Country'} />
        <FormTextarea name={'aboutMe'} control={control} label={'About me'} />
        <button disabled={isLoading}>Update profile</button>
      </form>
      <form onSubmit={handleAvatarFormSubmitted}>
        <input type="file" name="file" onChange={handleFileInputChanged} />
        <button disabled={loadingImage}>Upload Avatar</button>
      </form>
    </div>
  )
}

function UnderageUserError() {
  return (
    <p className={'text-sm text-red-500'}>
      A user under 13 cannot create a profile.{' '}
      <Link href={'#'} className={'underline'}>
        Privacy Policy
      </Link>
    </p>
  )
}
