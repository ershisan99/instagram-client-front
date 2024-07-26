import { inctagramService } from '@/services/inctagram.service'
import { GetUserProfileResponse, UpdateUserProfileArgs } from '@/services/inctagram.types'
import { toast } from 'sonner'

export const inctagramProfileService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getUserProfile: builder.query<GetUserProfileResponse, void>({
        query: () => {
          return 'v1/users/profile'
        },
        providesTags: ['UserProfile'],
      }),
      updateUserProfile: builder.mutation<any, UpdateUserProfileArgs>({
        query: body => {
          return {
            url: '/v1/users/profile',
            method: 'PUT',
            body,
          }
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            inctagramProfileService.util.updateQueryData('getUserProfile', undefined, draft => {
              Object.assign(draft, args)
            })
          )
          try {
            await queryFulfilled
          } catch (e) {
            patchResult.undo()
            toast.error(
              e.error.data?.messages?.map(m => m.message).join(', ') ?? 'Something went wrong'
            )
          }
        },
        invalidatesTags: ['UserProfile'],
      }),
      updateUserAvatar: builder.mutation<any, { file: File }>({
        query: ({ file }) => {
          const formData = new FormData()
          formData.append('file', file)
          return {
            url: '/v1/users/profile/avatar',
            body: formData,
            method: 'POST',
          }
        },
        invalidatesTags: ['UserProfile'],
      }),
    }
  },
})

export const {
  useLazyGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserAvatarMutation,
} = inctagramProfileService
