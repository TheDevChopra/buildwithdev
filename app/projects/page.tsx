import { supabase, type Product } from '@/lib/supabase'
import Link from 'next/link'
import { Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export default async function ProjectsPage() {
  let projects: Product[] = []
  
  // Guard against missing Supabase credentials during build/initial setup
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      projects = data
    }
  }

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
                key={project.id} 
                href={`/projects/${project.slug}`}
                className="group bg-background p-1 hover:bg-white transition-colors duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#C7C7C7]">
                  {project.thumbnail ? (
                    <Image 
                      src={project.thumbnail} 
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-divider font-black text-4xl">
                      {project.title.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col gap-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black group-hover:text-blue transition-colors uppercase">
                      {project.title}
                    </h3>
                    <Github className="w-5 h-5 text-mutedlabel group-hover:text-jet transition-colors" />
                  </div>
                  
                  <p className="text-sm line-clamp-2 text-deepgray">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue">
                    VIEW PRODUCT <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
            {projects.length === 0 && (
              <div className="col-span-full bg-background py-32 text-center border-t border-divider">
                <h3 className="text-3xl font-black uppercase mb-4">No products yet.</h3>
                <p className="label mb-8">Add your first product from the admin panel.</p>
                <Link href="/admin" className="text-xs font-bold uppercase tracking-widest text-blue hover:underline">
                  Go to /admin to create one
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
