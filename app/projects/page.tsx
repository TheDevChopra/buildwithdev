import { getAllProjects } from '@/lib/mdx'
import Link from 'next/link'
import { Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="w-full flex flex-col">
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">PROJECTS</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24">
          <h1 className="section-headline mb-16">
            BUILD<br />
            LAB
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 bg-divider">
            {projects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="group bg-background p-1 hover:bg-white transition-colors duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#C7C7C7]">
                  {project.image && (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black group-hover:text-blue transition-colors">
                      {project.title}
                    </h3>
                    <Github className="w-5 h-5 text-mutedlabel group-hover:text-jet transition-colors" />
                  </div>
                  
                  <p className="text-sm line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1351AA]">
                    VIEW PRODUCT <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
