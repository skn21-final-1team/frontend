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
import { login } from '@/shared/api/auth.api'
import { useUserStore } from '@/shared/store/user-store'
import { loginFormSchema } from './login.schema'
import * as s from './index.style'

type FormData = { email: string; password: string }
type FormErrors = Partial<Record<keyof FormData, string>>

export function LoginContainer() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (data: FormData): FormErrors => {
    const result = loginFormSchema.safeParse(data)
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
    if (Object.keys(errors).length > 0) {
      setErrors(validate(newData))
    }
  }

  const handleSubmit = async () => {
    const fieldErrors = validate(formData)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setIsLoading(true)
    try {
      const loginResult = await login(formData.email, formData.password)
      useUserStore.getState().setUser(loginResult.user, loginResult.access_token)
      alert('로그인 성공!')
      router.push('/')
    } catch (error) {
      alert('로그인 실패: 이메일과 비밀번호를 확인해주세요.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <div className={s.wrapper()}>
      <Card className={s.card()}>
        <CardHeader className={s.cardHeader()}>
          <div className={s.headerLeft()}>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your email below to login</CardDescription>
          </div>
          <div className={s.headerRight()}>
            <Link href="/signup">
              <Button variant="link" className={s.signUpButton()}>
                Sign Up
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={onFormSubmit}>
            <div className={s.formContent()}>
              <div className={s.inputGroup()}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {errors.email && <p className={s.errorText()}>{errors.email}</p>}
              </div>
              <div className={s.inputGroup()}>
                <div className={s.passwordLabelWrapper()}>
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className={s.forgotPasswordLink()}>
                    Forgot password?
                  </a>
                </div>
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
            </div>
          </form>
        </CardContent>

        <CardFooter className={s.cardFooter()}>
          <Button
            variant="default"
            type="button"
            className={s.submitButton()}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? <Spinner data-icon="inline-start" /> : 'Login'}
          </Button>
          <Button variant="outline" className={s.googleLoginButton()}>
            <Image src="/google_icon.svg" alt="Google" width={20} height={20} />
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}