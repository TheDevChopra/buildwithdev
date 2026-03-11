import { getSupabase, type ResearchPost } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ResearchPage() {
  let articles: ResearchPost[] = []

  const supabase = getSupabase()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        articles = data
      }
    } catch (e) {
      console.error('Build-time fetch skipped:', e)
    }
  }

  return (
    <div className="w-full flex flex-col">
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-divider">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-6 md:p-12">
          <span className="label">RESEARCH</span>
        </div>
        
        <div className="md:col-span-9 p-8 md:p-16 lg:p-24">
          <h1 className="section-headline mb-12 md:mb-16 uppercase">
            THEORY +<br />
            SYSTEMS
          </h1>
          
          <div className="flex flex-col gap-1 bg-divider border border-divider">
            {articles.map((post) => (
              <Link 
                key={post.id} 
                href={`/research/${post.slug}`}
                className="group bg-background p-8 md:p-12 hover:bg-white transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-8"
              >
                <div className="flex flex-col gap-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <BookOpen size={16} className="text-blue" />
                    <span className="label">POST_0{post.id.substring(0, 2)}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black group-hover:text-blue transition-colors uppercase tracking-tighter leading-none">
                    {post.title}
                  </h2>
                  <p className="text-base md:text-lg text-deepgray leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>
                
                <div className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-jet group-hover:text-blue transition-colors whitespace-nowrap">
                  READ CASE STUDY <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
                </div>
              </Link>
            ))}
            
            {articles.length === 0 && (
              <div className="bg-white/50 py-24 md:py-32 text-center">
                <h3 className="text-2xl md:text-3xl font-black uppercase mb-4">Research in progress.</h3>
                <p className="label px-6">No posts published yet. Use the admin panel to add research notes.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
