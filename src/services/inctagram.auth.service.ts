import { inctagramService } from '@/services/inctagram.service'
import { LoginArgs } from '@/services/inctagram.types'

export const inctagramAuthService = inctagramService.injectEndpoints({
  endpoints: builder => {
    return {
      login: builder.mutation<any, LoginArgs>({
        query: body => {
          return {
            method: 'POST',
            url: '/v1/auth/login',
            body,
          }
        },
      }),
    }
  },
})

export const { useLoginMutation } = inctagramAuthService
