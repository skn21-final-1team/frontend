import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.email({ message: '이메일이 유효하지 않습니다.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
