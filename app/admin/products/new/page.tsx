'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

export default function NewProductPage() {
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

    const productData = {
      title,
      slug,
      description: formData.get('description'),
      video_url: formData.get('video_url'),
      github_url: formData.get('github_url'),
      tech_stack: formData.get('tech_stack'),
      prompts: formData.get('prompts'),
      architecture: formData.get('architecture'),
      thumbnail: formData.get('thumbnail'),
    }

    const supabase = getSupabase()
    if (!supabase) {
      setError('Database configuration missing')
      setLoading(false)
      return
    }

    const { error: supabaseError } = await supabase
      .from('products')
      .insert([productData])

    if (supabaseError) {
      setError(supabaseError.message)
      setLoading(false)
    } else {
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <div className="max-w-4xl flex flex-col gap-12 text-[#141414]">
      <div className="border-b border-[#C7C7C7] pb-8">
        <span className="label">CREATE</span>
        <h1 className="text-5xl font-black uppercase">ADD NEW PRODUCT</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white p-12 border border-[#C7C7C7]">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="label">PRODUCT NAME</label>
            <input name="title" className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label">THUMBNAIL URL</label>
            <input name="thumbnail" className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">DESCRIPTION</label>
          <textarea name="description" rows={3} className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" required />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="label">VIDEO URL (YOUTUBE / DRIVE)</label>
            <input name="video_url" className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="label">GITHUB URL</label>
            <input name="github_url" className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">TECH STACK</label>
          <input name="tech_stack" className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">PROMPTS USED</label>
          <textarea name="prompts" rows={5} className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA] font-mono text-sm" />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">ARCHITECTURE NOTES</label>
          <textarea name="architecture" rows={5} className="p-4 border border-[#C7C7C7] bg-[#F5F5F4] focus:outline-none focus:border-[#1351AA]" />
        </div>

        {error && <p className="text-red-600 font-bold uppercase text-xs">{error}</p>}

        <div className="flex justify-end gap-6 mt-4">
          <button type="button" onClick={() => router.back()} className="font-bold uppercase tracking-widest text-[#7A7A7A] hover:text-[#141414]">CANCEL</button>
          <button type="submit" disabled={loading} className="btn-primary min-w-[200px]">
            {loading ? 'PUBLISHING...' : 'PUBLISH PRODUCT'}
          </button>
        </div>
      </form>
    </div>
  )
}
