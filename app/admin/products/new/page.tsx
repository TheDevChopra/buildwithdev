'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'
import { Video, Link as LinkIcon, AlertCircle } from 'lucide-react'

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

    try {
      const supabase = getSupabase()
      if (!supabase) {
        setError('Database configuration missing.')
        setLoading(false)
        return
      }

      const { error: supabaseError } = await supabase
        .from('products')
        .insert([productData])

      if (supabaseError) {
        console.error('Insert error:', supabaseError)
        setError('Could not create product. Please try again.')
        setLoading(false)
      } else {
        router.push('/admin/products')
      }
    } catch (e) {
      console.error('Unexpected error:', e)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 md:gap-12 text-[#141414] pb-20">
      <div className="border-b border-divider pb-6 md:pb-8 text-center md:text-left">
        <span className="label">CREATE</span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">ADD NEW PRODUCT</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-12 border border-divider">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="label">PRODUCT NAME</label>
            <input name="title" className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-bold" placeholder="e.g. TAPQR" required />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="label">DESCRIPTION</label>
            <textarea name="description" rows={3} className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue leading-relaxed" placeholder="Short description of the product..." required />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">THUMBNAIL URL</label>
            <div className="relative">
              <input name="thumbnail" className="w-full p-4 pl-12 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm" placeholder="https://..." />
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-mutedlabel w-4 h-4" />
            </div>
          </div>

          {/* Improved Video Upload UI */}
          <div className="flex flex-col gap-2">
            <label className="label">VIDEO DEMO</label>
            <div className="border border-dashed border-divider p-6 md:p-8 text-center bg-[#F5F5F4]/50 flex flex-col items-center gap-4 group">
              <div className="w-12 h-12 bg-white border border-divider flex items-center justify-center rounded-none group-hover:border-blue transition-colors">
                <Video className="text-mutedlabel group-hover:text-blue w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-jet">Paste YouTube or Google Drive video link</p>
                <p className="text-xs text-mutedlabel mt-2">Example: https://youtube.com/watch?v=...</p>
              </div>
              <input 
                name="video_url" 
                className="w-full p-3 border border-divider bg-white focus:outline-none focus:border-blue font-mono text-xs mt-2" 
                placeholder="Link goes here..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">GITHUB URL</label>
            <div className="relative">
              <input name="github_url" className="w-full p-4 pl-12 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm" placeholder="https://github.com/..." />
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-mutedlabel w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">TECH STACK</label>
            <input name="tech_stack" className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue" placeholder="e.g. Next.js 14, TypeScript, Supabase" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">PROMPTS USED</label>
            <textarea name="prompts" rows={5} className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm" placeholder="Paste the core prompts used to build this..." />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">ARCHITECTURE NOTES</label>
            <textarea name="architecture" rows={5} className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue" placeholder="Describe the system architecture..." />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 flex gap-3 items-center">
            <AlertCircle className="text-red-600 w-4 h-4" />
            <p className="text-red-600 font-bold uppercase text-[10px] tracking-widest">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button type="button" onClick={() => router.back()} className="font-bold uppercase tracking-widest text-mutedlabel hover:text-jet p-4">CANCEL</button>
          <button type="submit" disabled={loading} className="btn-primary min-w-[200px]">
            {loading ? 'PUBLISHING...' : 'PUBLISH PRODUCT'}
          </button>
        </div>
      </form>
    </div>
  )
}
