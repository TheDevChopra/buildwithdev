'use client'

import { getSupabase, type Product } from '@/lib/supabase'
import Link from 'next/link'
import { Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  const fetchProjects = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        console.log('ProjectsPage fetch success:', data.length, 'products')
        setProjects(data)
      } else {
        console.error('ProjectsPage fetch error:', error)
      }
    } catch (e) {
      console.error('Error fetching projects:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()

    const supabase = getSupabase()
    if (!supabase) return

    const channel = supabase
      .channel('products-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProjects()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchProjects])

  return (
    <div className="w-full flex flex-col">
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-divider">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-6 md:p-12">
          <span className="label">PROJECTS</span>
        </div>
        
        <div className="md:col-span-9 p-8 md:p-16 lg:p-24">
          <h1 className="section-headline mb-12 md:mb-16">
            BUILD<br />
            LAB
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                href={`/projects/${project.slug}`}
                className="group bg-white border border-divider hover:border-blue transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden bg-white border-b border-divider">
                  {project.thumbnail ? (
                    <Image 
                      src={project.thumbnail} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 border border-[#C7C7C7] flex items-center justify-center text-sm text-[#7A7A7A]">
                      Demo coming soon
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 flex flex-col gap-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black group-hover:text-blue transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>
                    {project.github_url && (
                      <Github className="w-5 h-5 text-mutedlabel group-hover:text-jet transition-colors" />
                    )}
                  </div>
                  
                  <p className="text-sm line-clamp-2 text-deepgray leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-divider flex items-center justify-between text-xs font-black uppercase tracking-widest text-blue">
                    <span>VIEW PRODUCT</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </Link>
            ))}
            
            {!loading && projects.length === 0 && (
              <div className="col-span-full py-24 md:py-32 text-center border border-dashed border-divider bg-white/50">
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">No products yet.</h3>
                <p className="label mb-8 px-6">Add your first product from the admin panel to populate this laboratory.</p>
                <Link href="/admin" className="btn-primary inline-flex">
                  GO TO ADMIN
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
