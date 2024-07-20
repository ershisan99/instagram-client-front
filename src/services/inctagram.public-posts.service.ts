import { inctagramService } from '@/services/inctagram.service'
import {
  GetPostsArgs,
  GetPostsResponse,
  GetUserProfileResponse,
  UpdateUserProfileArgs,
} from '@/services/inctagram.types'

export const inctagramPublicPostsService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicPosts: builder.query<GetPostsResponse, GetPostsArgs>({
        query: ({ pageSize }) => {
          return {
            url: `v1/public-posts/all/`,
            params: {
              pageSize,
              sortBy: 'createdAt',
              sortDirection: 'desc',
            },
          }
        },
        providesTags: ['PublicPosts'],
      }),
    }
  },
})

export const { useGetPublicPostsQuery } = inctagramPublicPostsService
