'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
type ActionState = {
    message: string;
    success: boolean;
}


export async function deletePost(
    prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    try {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete/${formData.get('id')}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${formData.get('token')}`,
            }
        })

        if (!res.ok) throw new Error('Erro ao deletar post')


        return { message: 'Post deletado com sucesso!', success: true }
    } catch (error) {
        return { message: 'Falha ao deletar post', success: false }
    }finally{
        redirect('/')
    }

}