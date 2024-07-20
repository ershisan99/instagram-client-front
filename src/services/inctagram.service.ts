import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjczNSwiaWF0IjoxNzIxNDE0NTgzLCJleHAiOjE3MjE0MTgxODN9.O1Kao-oNtMDNtCPU0-exGlif7YJegpIVPxeZm1KC758'

export const inctagramService = createApi({
  // keepUnusedDataFor: 0,
  tagTypes: ['UserProfile', 'PublicPosts'],
  reducerPath: 'inctagramService',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api',
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),
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
