import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Github, Play } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function getEmbedUrl(url: string) {
  if (!url) return null

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`

  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^\/\?]+)/)
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`

  return url
}

export default async function ProjectItemPage({ params }: { params: { slug: string } }) {
  let project = null

  // Guard against missing Supabase credentials
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', params.slug)
      .single()
    
    if (!error && data) {
      project = data
    }
  }

  if (!project) notFound()

  const embedUrl = getEmbedUrl(project.video_url)

  return (
    <div className="w-full flex flex-col">
      {/* PROJECT HERO */}
      <section className="grid-layout border-b border-divider min-h-[60vh]">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">PRODUCT</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24 flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1">
            <h1 className="section-headline mb-8 uppercase">{project.title}</h1>
            <p className="text-2xl max-w-xl text-deepgray">{project.description}</p>
          </div>
          
          <div className="flex-1 w-full aspect-video bg-jet border border-divider overflow-hidden">
            {embedUrl ? (
              <iframe 
                src={embedUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-cream gap-4">
                <Play className="w-12 h-12" />
                <span className="label text-cream">NO DEMO AVAILABLE</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STRUCTURE SECTION */}
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">STRUCTURE</span>
        </div>
        <div className="col-span-9 grid grid-cols-1 md:grid-cols-3">
          <div className="p-12 border-b md:border-b-0 md:border-r border-divider">
            <h3 className="text-xl font-black mb-6 uppercase">UI DESIGN</h3>
            <p className="text-sm text-deepgray">
              Strict Poster Modernist implementation. Neutral palette, heavy typography, and mathematical grid alignment.
            </p>
          </div>
          <div className="p-12 border-b md:border-b-0 md:border-r border-divider">
            <h3 className="text-xl font-black mb-6 uppercase">TECH STACK</h3>
            <p className="text-sm text-deepgray">
              {project.tech_stack || 'Next.js 14, TypeScript, Tailwind, Supabase.'}
            </p>
          </div>
          <div className="p-12">
            <h3 className="text-xl font-black mb-6 uppercase">ARCHITECTURE</h3>
            <p className="text-sm text-deepgray whitespace-pre-wrap">
              {project.architecture || 'Full-stack application with CMS and edge functions.'}
            </p>
          </div>
        </div>
      </section>

      {/* PROMPTS SECTION */}
      {project.prompts && (
        <section className="grid-layout border-b border-divider">
          <div className="col-span-3 border-r border-divider p-12">
            <span className="label">PROMPTS</span>
          </div>
          <div className="col-span-9 p-12 md:p-24 bg-white/50">
            <div className="font-mono bg-white border border-divider p-8">
              <p className="text-sm text-blue mb-4 uppercase font-bold tracking-widest">System Prompt</p>
              <p className="text-jet whitespace-pre-wrap">
                &quot;{project.prompts}&quot;
              </p>
            </div>
          </div>
        </section>
      )}

      {/* GITHUB SECTION */}
      {project.github_url && (
        <section className="grid-layout border-b border-divider">
          <div className="col-span-3 border-r border-divider p-12">
            <span className="label">GITHUB</span>
          </div>
          <div className="col-span-9 p-12 md:p-24 flex justify-center">
            <Link 
              href={project.github_url} 
              className="flex items-center gap-6 bg-jet text-cream px-16 py-8 hover:bg-blue transition-colors duration-300"
            >
              <Github className="w-12 h-12" />
              <span className="text-3xl font-black uppercase">PUBLIC REPOSITORY</span>
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
