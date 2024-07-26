import { z } from 'zod'
import { diffYears } from '@formkit/tempo'

export const profileSchema = z
  .object({
    userName: z
      .string()
      .min(6)
      .max(30)
      .regex(
        /^(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/,
        'Only letters, numbers, dashes and underscores are allowed'
      ),
    firstName: z
      .string()
      .min(1)
      .max(50)
      .regex(/^[A-Za-zА-Яа-я]+$/, 'Only latin and cyrillic letters are allowed'),
    lastName: z
      .string()
      .min(1)
      .max(50)
      .regex(/^[A-Za-zА-Яа-я]+$/, 'Only latin and cyrillic letters are allowed'),
    dateOfBirth: z.string().date().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
    aboutMe: z.string().max(200).optional(),
  })
  .superRefine((val, ctx) => {
    if (val.dateOfBirth) {
      const diff = diffYears(new Date(), new Date(val.dateOfBirth))
      console.log(diff)
      if (diff > 13) return
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['dateOfBirth'],
        message: 'A user under 13 cannot create a profile. Privacy Policy',
      })
    }
  })

export type UserProfile = z.infer<typeof profileSchema>
