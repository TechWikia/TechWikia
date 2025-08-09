'use client'
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react'
import { deletePost } from '@/app/services/deletePost'




export function DeleteButton({ post, token }: { post: string; token: string }) {
    const { pending } = useFormStatus();
    const [state, formAction] = useActionState(deletePost, { message: '', success: false })
    return (

        <form action={formAction}>
            <input type="hidden" name="token" value={token} />
            <input type="hidden" name="id" value={post} />
            <button aria-disabled={pending} type="submit" className="mt-4 w-full cursor-pointer" >
                {pending ? 'Deletando...' : 'Deletar'}
                {state.message && (
                    <p className={state.success ? 'text-green-600' : 'text-red-600'}>
                        {state.message}
                    </p>
                )}

            </button>
        </form>
    );
}