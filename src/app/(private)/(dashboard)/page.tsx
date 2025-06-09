import { cookies } from 'next/headers'
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

  const posts:Post[] = await data.json()


  return (
    <>
      <p>posts</p>
      <div>
        {posts.map((post:Post) => (
          <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}