'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Spinner,
  Label,
  Button,
} from '@/shared/components'
import { useRouter } from 'next/navigation'
import { signup } from '@/shared/api/auth.api'
import { signupFormSchema } from './signup.schema'
import { useGoogleLogin as useGoogleAuth } from '@react-oauth/google'
import { api } from '@/shared/utils/fetcher'
import { useUserStore } from '@/shared/store/user-store'
import * as s from './index.style'

type FormData = { name: string; email: string; password: string; confirmPassword: string }
type FormErrors = Partial<Record<keyof FormData | 'general', string>>

export function SignupContainer() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (data: FormData): FormErrors => {
    const result = signupFormSchema.safeParse(data)
    if (result.success) return {}
    const fieldErrors: FormErrors = {}
    result.error.issues.forEach((err) => {
      const key = err.path[0] as keyof FormData
      if (!fieldErrors[key]) fieldErrors[key] = err.message
    })
    return fieldErrors
  }

  const handleChange = (field: keyof FormData, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    setErrors(validate(newData))
  }

  const handleSubmit = async () => {
    const fieldErrors = validate(formData)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setIsLoading(true)
    try {
      await signup({ email: formData.email, password: formData.password, name: formData.name })
      alert('회원가입 성공! 로그인해주세요.')
      router.push('/login')
    } catch (error) {
      setErrors({ general: '회원가입 실패: 이미 사용 중인 이메일이거나 서버 오류입니다.' })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit()
  }

  const handleGoogleLogin = useGoogleAuth({
    onSuccess: async (codeResponse) => {
      try {
        const response = await api.post('/auth/google', { id_token: codeResponse.access_token })
        const { access_token, user } = response.data.data
        useUserStore.getState().setUser(user, access_token)
        alert('구글 로그인(회원가입) 성공!')
        router.push('/')
      } catch (error) {
        console.error('구글 로그인 서버 연동 실패:', error)
        setErrors({ general: '구글 로그인에 실패했습니다.' })
      }
    },
    onError: (error) => {
      console.error('구글 로그인 팝업 실패:', error)
      setErrors({ general: '구글 로그인 팝업이 닫혔거나 에러가 발생했습니다.' })
    },
  })
 

  return (
    <div className={s.wrapper()}>
      <Card className={s.card()}>
        <CardHeader className={s.cardHeader()}>
          <div className={s.headerLeft()}>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your email below to create your account</CardDescription>
          </div>
          <Link href="/login">
            <Button variant="link" className={s.loginLink()}>
              Login
            </Button>
          </Link>
        </CardHeader>

        <CardContent>
          <form onSubmit={onFormSubmit}>
            <div className={s.formContent()}>
              <div className={s.inputGroup()}>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Joshua Juwon Choi"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                {errors.name && <p className={s.errorText()}>{errors.name}</p>}
              </div>
              <div className={s.inputGroup()}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="final1@team.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <p className={s.errorText()}>{errors.email}</p>}
              </div>
              <div className={s.inputGroup()}>
                <Label htmlFor="password">Password</Label>
                <div className={s.passwordInputWrapper()}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                  />
                  {errors.password && <p className={s.errorText()}>{errors.password}</p>}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={s.showPasswordButton()}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className={s.eyeIcon()} />
                    ) : (
                      <Eye className={s.eyeIcon()} />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <div className={s.inputGroup()}>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
                {errors.confirmPassword && <p className={s.errorText()}>{errors.confirmPassword}</p>}
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className={s.cardFooter()}>
          {errors.general && <p className={s.errorText()}>{errors.general}</p>}
          <Button
            variant="default"
            type="button"
            className={s.submitButton()}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner data-icon="inline-start" /> : 'Sign Up'}
          </Button>
          <Button
            variant="outline"
            className={s.googleButton()}
            onClick={() => handleGoogleLogin()}
          >
            <Image src="/google_icon.svg" alt="Google" width={20} height={20} />
            Sign up with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}