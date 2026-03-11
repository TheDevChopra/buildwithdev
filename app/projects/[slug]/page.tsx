import { getSupabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Github, Play } from 'lucide-react'
import Link from 'next/link'
import ProjectLayout, { ProjectSection } from '@/components/product/project-layout'

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

  const supabase = getSupabase()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single()
      
      if (!error && data) {
        project = data
      }
    } catch (e) {
      console.error('Build-time fetch skipped or failed:', e)
    }
  }

  if (!project) notFound()

  const embedUrl = getEmbedUrl(project.video_url)

  const VideoSlot = (
    <div className="w-full h-full bg-jet flex flex-col items-center justify-center text-cream">
      {embedUrl ? (
        <iframe 
          src={embedUrl}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Play className="w-12 h-12" />
          <span className="label text-cream">NO DEMO AVAILABLE</span>
        </div>
      )}
    </div>
  )

  return (
    <ProjectLayout 
      title={project.title} 
      description={project.description}
      videoSlot={VideoSlot}
    >
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ProjectSection title="Tech Stack">
            {project.tech_stack || 'React, Next.js, Tailwind, Supabase.'}
          </ProjectSection>
          
          <ProjectSection title="Architecture">
            {project.architecture || 'Scalable full-stack application with modular UI and secure backend integration.'}
          </ProjectSection>
        </div>

        {project.prompts && (
          <ProjectSection title="Prompts">
            <div className="font-mono bg-white border border-divider p-6 md:p-8 text-sm md:text-base selection:bg-blue selection:text-cream">
              {project.prompts}
            </div>
          </ProjectSection>
        )}

        {project.github_url && (
          <div className="pt-8">
            <Link 
              href={project.github_url} 
              target="_blank"
              className="btn-primary inline-flex md:w-auto w-full group"
            >
              <Github className="w-6 h-6" />
              VIEW ON GITHUB
            </Link>
          </div>
        )}
      </div>
    </ProjectLayout>
  )
}
