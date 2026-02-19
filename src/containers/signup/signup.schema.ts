import { z } from 'zod'

export const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
      .max(20, { message: '이름은 최대 20자 이하여야 합니다.' }),
    email: z.string().email({ message: '이메일이 유효하지 않습니다.' }).max(30, { message: '이메일은 최대 30자 이하여야 합니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자리 이상이어야 합니다.' })
      .max(20, { message: '비밀번호는 최대 20자 이하여야 합니다.' })
      .regex(/[a-z]/, { message: '비밀번호는 최소 하나의 소문자를 포함해야 합니다.' })
      .regex(/[0-9]/, { message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.' })
      .regex(/[@$!%*?&]/, { message: '비밀번호는 최소 하나의 특수문자(@$!%*?&)를 포함해야 합니다.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type SignupFormValues = z.infer<typeof signupFormSchema>