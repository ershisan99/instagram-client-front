import { inctagramService } from '@/services/inctagram.service'
import { GetUserProfileResponse, UpdateUserProfileArgs } from '@/services/inctagram.types'

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
        invalidatesTags: ['UserProfile'],
      }),
    }
  },
})

export const { useLazyGetUserProfileQuery, useUpdateUserProfileMutation } = inctagramProfileService
