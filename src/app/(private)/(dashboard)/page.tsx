import { cookies } from 'next/headers'
import EditButton from '@/app/Components/EditButton'
export default async function Dashboard() {

  const cookieStore = (await cookies()).get('token')

  if (!cookieStore) {
    return 'erro no token'
  }
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
    headers: {
      'Authorization': `Bearer ${cookieStore.value}`, // Use "Bearer" for JWT tokens
      'Content-Type': 'application/json' // Adjust if needed
    }
  }
  )
  type Post = {
    _id: string;
    title: string;
    content: string;
    userId: string;
    createdAt: string;
    tags: string[];
  };

  const posts: Post[] = await data.json()


  return (
    <>
      <div className='flex flex-col items-center justify-center'>

        <p>posts</p>
        <div className='flex flex-col bg-blue-700 w-4/12'>
          {posts.map((post: Post) => (

            <div key={post._id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              <p >{post.tags}</p>

            <div>
              <EditButton/>
              
            </div>

            </div>
            

          ))}
        </div>
      </div>
    </>
  );
}
