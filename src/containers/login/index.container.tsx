'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/shared/components'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components'
import { Input } from '@/shared/components'
import { Label } from '@/shared/components'

import { useLogin } from './hooks/use-login'

import * as s from './index.style'

export function LoginContainer() {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, onSubmit, isLoading } = useLogin()

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
            {isLoading ? 'Logging in...' : 'Login'}
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
