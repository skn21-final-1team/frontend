'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { isAxiosError } from 'axios'
import { login } from '@/shared/api/auth.api'
import { useUserStore } from '@/shared/store/user-store'
import { loginFormSchema, type LoginFormValues } from './login.schema'
import { useGoogleAuth } from '@/shared/hooks/google-auth'
import * as s from './index.style'

export function LoginContainer() {
  const router = useRouter()
  const { loginWithGoogle } = useGoogleAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const loginResult = await login(data.email, data.password)
      useUserStore.getState().setUser(loginResult.user, loginResult.access_token)
      router.push('/')
    } catch (error) {
      if (!isAxiosError(error) || !error.response) {
        setError('root', { message: '네트워크 연결을 확인해주세요.' })
        return
      }
      const status = error.response.status
      const message =
        status === 401
          ? '비밀번호가 일치하지 않습니다.'
          : status === 404
            ? '존재하지 않는 이메일입니다.'
            : '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      setError('root', { message })
    }
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

        <form onSubmit={handleSubmit(onSubmit)} onChange={() => clearErrors('root')}>
          <CardContent>
            <div className={s.formContent()}>
              <div className={s.inputGroup()}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
                {errors.email && <p className={s.errorText()}>{errors.email.message}</p>}
              </div>
              <div className={s.inputGroup()}>
                <Label htmlFor="password">Password</Label>
                <div className={s.passwordInputWrapper()}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
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
                {errors.password && <p className={s.errorText()}>{errors.password.message}</p>}
              </div>
            </div>
          </CardContent>

          <CardFooter className={s.cardFooter()}>
            {errors.root && <p className={s.errorText()}>{errors.root.message}</p>}
            <Button
              variant="default"
              type="submit"
              className={s.submitButton()}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner data-icon="inline-start" /> : 'Login'}
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
