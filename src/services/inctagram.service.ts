import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from '@/services/inctagram.fetch-base-query'

export const inctagramService = createApi({
  // keepUnusedDataFor: 0,
  tagTypes: ['UserProfile', 'PublicPosts'],
  reducerPath: 'inctagramService',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    uploadImage: builder.mutation<any, { files: FileList }>({
      query({ files }) {
        const formData = new FormData()
        Array.from(files).forEach(file => {
          formData.append('file', file)
        })
        console.log(formData)
        return {
          method: 'POST',
          body: formData,
          url: '/v1/posts/image',
        }
      },
    }),
    deleteImage: builder.mutation<any, { id: string }>({
      query({ id }) {
        return {
          method: 'DELETE',
          url: `/v1/posts/image/${id}`,
          params: {},
        }
      },
    }),
  }),
})

export const { useUploadImageMutation } = inctagramService
