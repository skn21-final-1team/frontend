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
import { signup } from '@/shared/api/auth.api'
import { signupFormSchema, type SignupFormValues } from './signup.schema'
import { useGoogleAuth } from '@/shared/hooks/google-auth'
import * as s from './index.style'

export function SignupContainer() {
  const router = useRouter()
  const { loginWithGoogle } = useGoogleAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup({ email: data.email, password: data.password, name: data.name })
      router.push('/login')
    } catch (error) {
      if (!isAxiosError(error) || !error.response) {
        setError('root', { message: '네트워크 연결을 확인해주세요.' })
        return
      }
      const status = error.response.status
      const message =
        status === 409
          ? '이미 사용 중인 이메일입니다.'
          : '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      setError('root', { message })
    }
  }

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
          <form onSubmit={handleSubmit(onSubmit)} onChange={() => clearErrors('root')}>
            <div className={s.formContent()}>
              <div className={s.inputGroup()}>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Joshua Juwon Choi"
                  {...register('name')}
                />
                {errors.name && <p className={s.errorText()}>{errors.name.message}</p>}
              </div>

              <div className={s.inputGroup()}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="final1@team.com"
                  {...register('email')}
                />
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

              <div className={s.inputGroup()}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className={s.passwordInputWrapper()}>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
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
                {errors.confirmPassword && (
                  <p className={s.errorText()}>{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <CardFooter className={s.cardFooter()}>
              {errors.root && <p className={s.errorText()}>{errors.root.message}</p>}
              <Button
                variant="default"
                type="submit"
                className={s.submitButton()}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner data-icon="inline-start" /> : 'Sign Up'}
              </Button>
              <Button
                variant="outline"
                type="button"
                className={s.googleButton()}
                onClick={loginWithGoogle}
              >
                <Image src="/google_icon.svg" alt="Google" width={20} height={20} />
                Sign up with Google
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
