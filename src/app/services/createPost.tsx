'use server';

import { cookies } from 'next/headers';
import { FormStateCreate, CreateSchema} from '@/app/auth/validation';
import { redirect } from 'next/navigation'

export async function createPost(state: FormStateCreate, formData: FormData): Promise<FormStateCreate> {

  
  const validatedFields = CreateSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  

  try {
    const cookieStore = (await cookies()).get('token')

    if (!cookieStore) {
      throw new Error("Token não encontrado nos cookies.");
    }
  

  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${cookieStore.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedFields.data),
      });



    if (!res.ok) {
      return { message: 'erro' };
    }
  
  } catch (error) {
    console.error(error);
    return { message: 'Erro ao realizar login.' };
  }
  redirect('/')
}
