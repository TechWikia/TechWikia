'use client'
import { signin } from '@/app/auth/auth'
import { LoginButton } from '@/app/Components/LoginButton';
import Link from 'next/link'
import { useActionState } from 'react';



export default function SigninForm() {
  const [state, action] = useActionState(signin, undefined);
  return (
    <>
      <form action={action} className='flex-col bg-gray-400 w-1/5'>
     
        <div>
          <label className='p-1' htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" placeholder="Digite seu email" />
        </div>
        {state?.errors?.name && (<p className="text-sm text-red-500">{state.errors.name}</p>)}

        <div>
          <label className='p-2' htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" placeholder="Digite sua senha" />
        </div>
        {state?.errors?.password && (<p className="text-sm text-red-500">{state.errors.password}</p>)}

        <LoginButton />
      </form>
      <div>
        <button>
          <Link href={'/signup'}>Não tem conta?</Link>
        </button>
      </div>
    </>
  )
}