'use client'
import { createPost } from '@/app/services/createPost';
import { useActionState } from 'react';


export default function Create() {
    const [state, action] = useActionState(createPost, undefined);
    return (

        <div className="flex items-center justify-center ">
            <form action={action}className="flex flex-col ">
                <label htmlFor="">Insira o titulo do post</label>
                <input type="text" name='title' className="border"/>
                {state?.errors?.title && (<p className="text-sm text-red-500">{state.errors.title}</p>)}

                <label htmlFor="">Insira o conteudo do post</label>
                <input type="text" name='content' className="border"/>
                {state?.errors?.content && (<p className="text-sm text-red-500">{state.errors.content}</p>)}


                <button type="submit" className="bg-blue-900 mt-4 w-full cursor-pointer">
                    criar 
                </button>

            </form>

        </div>

    )
}