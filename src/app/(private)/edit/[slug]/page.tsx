import { cookies } from 'next/headers'
import EditForm from './editForm'
import EditForm2 from './editForm2'
import { Post } from '@/types/post'

export default async function EditPage({
    params,
  }: {
    params: Promise<{ slug: string }>  // pega id do post pelo parametro da url
  }) {


    const cookieStore = (await cookies()).get('token')
    if (!cookieStore) {
        return 'erro no token'
      }

      // Com o ID, faz a busca pelo post
    const { slug } = await params
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${slug}`, {
        headers: {
          'Authorization': `Bearer ${cookieStore.value}`, 
          'Content-Type': 'application/json' 
        }
      }
      )

      const post: Post = await data.json()

     
   
      // retorna o formulario com o post buscado e o token
    return (
      <div className="flex items-center justify-center ">
      <EditForm2 post={post} token={cookieStore.value} />
    </div>
    )
  }