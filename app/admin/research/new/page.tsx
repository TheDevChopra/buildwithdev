'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'
import { Info, BookOpen } from 'lucide-react'

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

    const supabase = getSupabase()
    if (!supabase) {
      setError('Database configuration missing')
      setLoading(false)
      return
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
    <div className="max-w-2xl mx-auto flex flex-col gap-8 md:gap-12 text-[#141414] pb-20">
      <div className="border-b border-divider pb-6 md:pb-8 text-center md:text-left">
        <span className="label">CREATE</span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">NEW RESEARCH POST</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-12 border border-divider">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="label font-black">TITLE</label>
            <div className="relative">
              <input name="title" className="w-full p-4 pl-12 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-bold uppercase tracking-tight" placeholder="e.g. AI PRODUCT DISCOVERY SYSTEM" required />
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-mutedlabel w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">SHORT SUMMARY</label>
            <textarea name="summary" rows={3} className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue leading-relaxed" placeholder="Brief overview of the research..." required />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end mb-2">
              <label className="label">CONTENT (MDX SUPPORTED)</label>
              <span className="text-[10px] text-mutedlabel uppercase font-black tracking-widest bg-divider/10 px-2 py-1 border border-divider/20">Markdown Enabled</span>
            </div>
            <textarea name="content" rows={15} className="p-6 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm leading-relaxed" placeholder="# Introduction..." required />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 flex gap-3 items-center">
            <Info className="text-red-600 w-4 h-4" />
            <p className="text-red-600 font-bold uppercase text-[10px] tracking-widest">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button type="button" onClick={() => router.back()} className="font-bold uppercase tracking-widest text-mutedlabel hover:text-jet p-4">CANCEL</button>
          <button type="submit" disabled={loading} className="btn-primary min-w-[200px]">
            {loading ? 'PUBLISHING...' : 'PUBLISH POST'}
          </button>
        </div>
      </form>
    </div>
  )
}
