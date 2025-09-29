import {LoginForm} from '@/components/auth/LoginForm'
import React, { Suspense } from 'react'

const LoginPage = () => {
  return (
    <Suspense>
      <LoginForm/>
    </Suspense>
  )
}

export default LoginPage