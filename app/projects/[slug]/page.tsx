import { getProjectBySlug, getAllProjects } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { Github, Play } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}

export default async function ProjectItemPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  return (
    <div className="w-full flex flex-col">
      {/* PROJECT HERO */}
      <section className="grid-layout border-b border-divider min-h-[60vh]">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">PRODUCT</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
            <h1 className="section-headline mb-8">{project.metadata.title}</h1>
            <p className="text-2xl max-w-xl">{project.metadata.description}</p>
          </div>
          
          <div className="flex-1 w-full aspect-video bg-jet relative flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-cream">
              <Play className="w-12 h-12" />
              <span className="label text-cream">DEMO RECORDING</span>
            </div>
            {/* Real implementation would use: <video src={project.metadata.video} controls /> */}
          </div>
        </div>
      </section>

      {/* STRUCTURE SECTION */}
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">STRUCTURE</span>
        </div>
        <div className="col-span-9 grid grid-cols-3">
          {['UI DESIGN', 'TECH STACK', 'ARCHITECTURE'].map((title) => (
            <div key={title} className="p-12 border-r border-divider last:border-r-0">
              <h3 className="text-xl font-bold mb-6">{title}</h3>
              <p className="text-sm">
                Detailed notes on {title.toLowerCase()} for {project.metadata.title}. 
                Following strict Poster Modernist rules and performance standards.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMPTS SECTION */}
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">PROMPTS</span>
        </div>
        <div className="col-span-9 p-12 md:p-24 bg-white/50">
          <div className="font-mono bg-white border border-divider p-8">
            <p className="text-sm text-blue mb-4 uppercase font-bold tracking-widest">System Prompt</p>
            <p className="text-jet">
              &quot;Build a high-performance {project.metadata.title} tool using Next.js and Tailwind...&quot;
            </p>
          </div>
        </div>
      </section>

      {/* GITHUB SECTION */}
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">GITHUB</span>
        </div>
        <div className="col-span-9 p-12 md:p-24 flex justify-center">
          <Link 
            href={project.metadata.github || '#'} 
            className="flex items-center gap-6 bg-jet text-cream px-16 py-8 hover:bg-blue transition-colors duration-300"
          >
            <Github className="w-12 h-12" />
            <span className="text-3xl font-black uppercase">PUBLIC REPOSITORY</span>
          </Link>
        </div>
      </section>

      {/* MDX CONTENT (rendered at bottom if extra details provided) */}
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12" />
        <div className="col-span-9 p-12 md:p-24 prose max-w-none">
          <MDXRemote source={project.content} />
        </div>
      </section>
    </div>
  )
}
