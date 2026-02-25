'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as z from 'zod'
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
import { useGoogleAuth } from '@/shared/hooks/google-auth'
import * as s from './index.style'

type FormData = { email: string; password: string }
type FormErrors = Partial<Record<keyof FormData | 'general', string>>

export function LoginContainer() {
  const router = useRouter()
  const { loginWithGoogle } = useGoogleAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (data: FormData): FormErrors => {
    const result = loginFormSchema.safeParse(data)
    if (result.success) return {}
    const fieldErrors: FormErrors = {}
    result.error.issues.forEach((err: z.core.$ZodIssue) => {
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
    setErrors({})

    try {
      const loginResult = await login(formData.email, formData.password)
      useUserStore.getState().setUser(loginResult.user, loginResult.access_token)
      router.push('/')
    } catch (error) {
      setErrors({ general: '이메일 또는 비밀번호를 다시 확인해주세요.' })
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

        <form onSubmit={onFormSubmit}>
          <CardContent>
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
          </CardContent>

          <CardFooter className={s.cardFooter()}>
            {errors.general && <p className={s.errorText()}>{errors.general}</p>}
            <Button
              variant="default"
              type="submit"
              className={s.submitButton()}
              disabled={isLoading}
            >
              {isLoading ? <Spinner data-icon="inline-start" /> : 'Login'}
            </Button>
            <Button
              variant="outline"
              type="button"
              className={s.googleLoginButton()}
              onClick={loginWithGoogle}
            >
              <Image src="/google_icon.svg" alt="Google" width={20} height={20} />
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
