'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import * as s from './index.style'

export function SignupContainer() {
  const [showPassword, setShowPassword] = useState(false)
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
          <form>
            <div className={s.formContent()}>
              <div className={s.inputGroup()}>
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="Joshua Juwon Choi" required />
              </div>
              <div className={s.inputGroup()}>
                <Label htmlFor="id">ID</Label>
                <Input id="id" type="text" placeholder="SKN21" required />
              </div>
              <div className={s.inputGroup()}>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="final1@team.com" required />
              </div>
              <div className={s.inputGroup()}>
                <Label htmlFor="password">Password</Label>
                <div className={s.passwordInputWrapper()}>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    required
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
              <div className={s.inputGroup()}>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className={s.cardFooter()}>
          <Button type="submit" className={s.submitButton()}>
            Sign Up
          </Button>
          <Button variant="outline" className={s.googleButton()}>
            <Image src="/google_icon.svg" alt="Google" width={20} height={20} />
            Sign up with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
