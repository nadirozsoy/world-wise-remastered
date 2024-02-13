import { useEffect, useId, useState } from 'react'
import Button from '@/components/shared/Button'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

const SigninForm = () => {
  const [email, setEmail] = useState<string>('jack@example.com')
  const [password, setPassword] = useState<string>('qwerty')

  const id = useId()
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (email && password) login(email, password)
  }

  useEffect(() => {
    if (isAuthenticated) navigate('/app', { replace: true })
  }, [isAuthenticated, navigate])

  return (
    <div className='bg-[--color-dark--2] sm:p-[2.5rem]'>
      <div className='grid min-h-dvh place-items-center rounded-lg bg-[--color-dark--1] sm:min-h-[calc(100dvh-5rem)]'>
        <form className='grid w-full max-w-2xl gap-5 rounded-xl bg-[--color-dark--2] p-10' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
            <label htmlFor={id + '-email'} className='text-[1.6rem]'>
              Email address
            </label>
            <input
              type='email'
              id={id + '-email'}
              className='rounded-lg p-4 text-[1.6rem] text-black'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor={id + '-password'} className='text-[1.6rem]'>
              Password
            </label>
            <input
              type='password'
              id={id + '-password'}
              className='rounded-lg p-4 text-[1.6rem] text-black'
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className='mt-4'>
            <Button type='submit'>Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default SigninForm
