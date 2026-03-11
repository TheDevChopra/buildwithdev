'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NewResearchPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

    const postData = {
      title,
      slug,
      summary: formData.get('summary'),
      content: formData.get('content'),
    }

    const { error: supabaseError } = await supabase
      .from('research_posts')
      .insert([postData])

    if (supabaseError) {
      setError(supabaseError.message)
      setLoading(false)
    } else {
      router.push('/admin/research')
      router.refresh()
    }
  }

  return (
    <div className="max-w-4xl flex flex-col gap-12 text-[#141414]">
      <div className="border-b border-[#C7C7C7] pb-8">
        <span className="label">CREATE</span>
        <h1 className="text-5xl font-black uppercase">ADD NEW RESEARCH</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white p-12 border border-[#C7C7C7]">
        <div className="flex flex-col gap-2">
          <label className="label">TITLE</label>
          <input name="title" className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">SUMMARY</label>
          <textarea name="summary" rows={3} className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" required />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">CONTENT (MDX SUPPORTED)</label>
          <textarea name="content" rows={15} className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA] font-mono text-sm" required />
        </div>

        {error && <p className="text-red-600 font-bold uppercase text-xs">{error}</p>}

        <div className="flex justify-end gap-6 mt-4">
          <button type="button" onClick={() => router.back()} className="font-bold uppercase tracking-widest text-[#7A7A7A] hover:text-[#141414]">CANCEL</button>
          <button type="submit" disabled={loading} className="btn-primary min-w-[200px]">
            {loading ? 'PUBLISHING...' : 'PUBLISH RESEARCH'}
          </button>
        </div>
      </form>
    </div>
  )
}
