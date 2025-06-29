'use server';

import { cookies } from 'next/headers';
import { FormState, LoginFormSchema} from '@/app/auth/validation';
import { redirect } from 'next/navigation'

export async function signin(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      return { message: 'Credenciais inválidas.' };
    }

    const data = await res.text(); 

    if (!data) {
      return { message: 'Token não recebido.' };
    }
    
    const cookieStore = await cookies()

    cookieStore.set('token', data, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, 
      expires: 86400,
    });

 
  } catch (error) {
    console.error(error);
    return { message: 'Erro ao realizar login.' };
  }
  redirect('/')
}
