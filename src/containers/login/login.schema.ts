import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.email({ message: '이메일이 유효하지 않습니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자리 이상이어야 합니다.' })
    .max(20, { message: '비밀번호는 최대 20자 이하여야 합니다.' })
    .regex(/[a-z]/, { message: '비밀번호는 최소 하나의 소문자를 포함해야 합니다.' })
    .regex(/[0-9]/, { message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.' })
    .regex(/[@$!%*?&]/, { message: '비밀번호는 최소 하나의 특수문자(@$!%*?&)를 포함해야 합니다.' }),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
