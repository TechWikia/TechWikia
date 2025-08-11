import { FormState, SignupFormSchema } from '@/app/auth/validation';
import { redirect } from 'next/navigation'

export default async function Signup(state: FormState, formData: FormData) {

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    if (!res.ok) {
      return { message: 'Credenciais inválidas.' };
    }


  } catch (error) {
    console.error(error);
    return { message: 'Erro ao cadastrar.' };
  } finally {
    redirect('/')
  }

}