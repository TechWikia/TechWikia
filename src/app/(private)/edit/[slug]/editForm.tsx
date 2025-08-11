'use client'

import { useState } from 'react'
import { Post } from '@/types/post';


export default function EditForm({ post, token }: { post: Post; token: string }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/edit/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      })

      if (!res.ok) throw new Error('Erro ao atualizar o post')

      setMessage('Post atualizado com sucesso!')
    } catch (err) {
      setMessage('Erro ao atualizar post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label>
        Novo título do post
        <input
          type="text"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Novo conteúdo do post
        <textarea
          className="border p-2 w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>

      <button
        type="submit"
        className="bg-blue-900 text-white py-2"
        disabled={loading}
      >
        {loading ? 'Atualizando...' : 'Atualizar'}
      </button>

      {message && <p>{message}</p>}
    </form>
  )
}