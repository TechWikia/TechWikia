'use client'

import { useActionState } from 'react'

import {update} from '@/app/services/updatePost'

type Post = {
    _id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    tags: string[];
  }


export default function EditForm2({ post, token }: { post: Post; token: string }) {
    const [state, formAction] = useActionState(update, { message: '', success: false })
    
    return (
        <form action={formAction} className="flex flex-col w-full max-w-md gap-4">
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="id" value={post._id} />
    
          <label>
            Novo título do post
            <input
              type="text"
              name="title"
              className="border p-2 w-full"
              defaultValue={post.title}
            />
          </label>
    
          <label>
            Novo conteúdo do post
            <textarea
              name="content"
              className="border p-2 w-full"
              defaultValue={post.content}
            />
          </label>
    
          <button type="submit" className="bg-blue-900 text-white py-2">
            Atualizar
          </button>
    
          {state.message && (
            <p className={state.success ? 'text-green-600' : 'text-red-600'}>
              {state.message}
            </p>
          )}
        </form>
      )
    
}
