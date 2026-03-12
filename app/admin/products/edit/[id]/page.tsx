'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getSupabase, type Product } from '@/lib/supabase'
import { Link as LinkIcon, Info, Loader2 } from 'lucide-react'

export default function EditProductPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [product, setProduct] = useState<Product | null>(null)
  
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string

  useEffect(() => {
    async function fetchProduct() {
      const supabase = getSupabase()
      if (!supabase) return

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

      if (error) {
        setError('Error loading product: ' + error.message)
      } else {
        setProduct(data)
      }
      setLoading(false)
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    const productData = {
      title: formData.get('title'),
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
      setSaving(false)
      return
    }

    const { error: supabaseError } = await supabase
      .from('products')
      .update(productData)
      .eq('id', productId)

    if (supabaseError) {
      setError(supabaseError.message)
      setSaving(false)
    } else {
      router.push('/admin/products')
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-blue" />
        <p className="label text-xl">LOADING PRODUCT DATA...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h2 className="text-4xl font-black uppercase mb-8">PRODUCT NOT FOUND</h2>
        <button onClick={() => router.back()} className="btn-primary">GO BACK</button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 md:gap-12 text-[#141414] pb-20">
      <div className="border-b border-divider pb-6 md:pb-8 text-center md:text-left">
        <span className="label">REDACT</span>
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">EDIT PRODUCT</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8 bg-white p-6 md:p-12 border border-divider">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="label">PRODUCT NAME</label>
            <input 
              name="title" 
              defaultValue={product.title}
              className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-bold" 
              placeholder="e.g. TAPQR" 
              required 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="label">DESCRIPTION</label>
            <textarea 
              name="description" 
              defaultValue={product.description}
              rows={3} 
              className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue leading-relaxed" 
              placeholder="Short description..." 
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">THUMBNAIL URL</label>
            <div className="relative">
              <input 
                name="thumbnail" 
                defaultValue={product.thumbnail}
                className="w-full p-4 pl-12 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm" 
              />
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-mutedlabel w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">VIDEO DEMO URL</label>
            <input 
              name="video_url" 
              defaultValue={product.video_url}
              className="w-full p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm" 
              placeholder="YouTube or Drive link..." 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">GITHUB URL</label>
            <div className="relative">
              <input 
                name="github_url" 
                defaultValue={product.github_url}
                className="w-full p-4 pl-12 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm" 
              />
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-mutedlabel w-4 h-4" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">TECH STACK</label>
            <input 
              name="tech_stack" 
              defaultValue={product.tech_stack}
              className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">PROMPTS USED</label>
            <textarea 
              name="prompts" 
              defaultValue={product.prompts}
              rows={5} 
              className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-sm" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="label">ARCHITECTURE NOTES</label>
            <textarea 
              name="architecture" 
              defaultValue={product.architecture}
              rows={5} 
              className="p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue" 
            />
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
          <button type="submit" disabled={saving} className="btn-primary min-w-[200px]">
            {saving ? 'SAVING...' : 'UPDATE PRODUCT'}
          </button>
        </div>
      </form>
    </div>
  )
}
