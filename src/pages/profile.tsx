import {
  useLazyGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@/services/inctagram.profile.service'
import { FormInput } from '@/form/form-input'
import { useForm } from 'react-hook-form'
import { UpdateUserProfileArgs } from '@/services/inctagram.types'
import { useUploadImageMutation } from '@/services/inctagram.service'
import { useState } from 'react'

export default function Profile() {
  const [getProfile, profile] = useLazyGetUserProfileQuery()
  const [files, setFiles] = useState<FileList | null>(null)
  const [mutate, { isLoading }] = useUpdateUserProfileMutation()
  const [uploadImage, { isLoading: loadingImage }] = useUploadImageMutation()
  const { control, handleSubmit } = useForm<UpdateUserProfileArgs>({
    defaultValues: async () => {
      const { data } = await getProfile()

      if (!data) {
        return {} as UpdateUserProfileArgs
      }

      return {
        ...data,
        firstName: data.firstName ?? '',
        lastName: data.lastName ?? '',
        dateOfBirth: '1961-07-13T17:58:17.000Z',
        aboutMe: 'HELLO BITHCHES',
      }
    },
  })

  // const onSubmit = handleSubmit(data => {
  //   mutate(data)
  // })
  const onSubmit = handleSubmit(mutate)
  return (
    <div>
      Profile
      <h1 className={'text-xl font-medium'}>{profile.data?.userName}</h1>
      <h2 className={'text-lg font-medium'}>
        {profile.data?.firstName} {profile.data?.lastName}
      </h2>
      <form onSubmit={onSubmit}>
        <FormInput name={'userName'} control={control} label={'User name'} />
        <FormInput name={'firstName'} control={control} label={'First name'} />
        <FormInput name={'lastName'} control={control} label={'Last name'} />
        <button disabled={isLoading}>Update profile</button>
      </form>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!files || !files.length) {
            return
          }
          uploadImage({ files })
        }}
      >
        <input
          type="file"
          name="file"
          multiple
          onChange={e => {
            setFiles(e.currentTarget.files)
          }}
        />
        <button disabled={loadingImage}>upload image</button>
      </form>
    </div>
  )
}
