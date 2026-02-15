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
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { login } from '@/shared/api/auth.api'
import { useTokenStore } from '@/shared/store/token-store'
import { useUserStore } from '@/shared/store/user-store'
import { loginFormSchema, LoginFormValues } from './login.schema'
import * as s from './index.style'

export function LoginContainer() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const result = await login(data.email, data.password)
      useTokenStore.getState().setTokens(result.access_token)
      useUserStore.getState().setUser(result.user)

      alert('로그인 성공!')
      router.push('/')
    } catch (error) {
      alert('로그인 실패: 이메일과 비밀번호를 확인해주세요.')
      console.error(error)
    } finally {
      setIsLoading(false)
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

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formContent()}>
              <div className={s.inputGroup()}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                />
                {errors.email && <p className={s.errorText()}>{errors.email.message}</p>}
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
                    {...register('password')}
                  />
                  {errors.password && <p className={s.errorText()}>{errors.password.message}</p>}
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
            type="submit"
            className={s.submitButton()}
            onClick={handleSubmit(onSubmit)}
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
