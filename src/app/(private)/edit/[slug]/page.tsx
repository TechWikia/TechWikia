import { cookies } from 'next/headers'
import EditForm from './editForm'

export default async function EditPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {


    const cookieStore = (await cookies()).get('token')
    if (!cookieStore) {
        return 'erro no token'
      }

    const { slug } = await params
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/${slug}`, {
        headers: {
          'Authorization': `Bearer ${cookieStore.value}`, // Use "Bearer" for JWT tokens
          'Content-Type': 'application/json' // Adjust if needed
        }
      }
      )

      const post: Post = await data.json()

      type Post = {
        _id: string;
        title: string;
        content: string;
        userId: string;
        createdAt: string;
        tags: string[];
      };
   
    return (
      <div className="flex items-center justify-center ">
      <EditForm post={post} token={cookieStore.value} />
    </div>
    )
  }