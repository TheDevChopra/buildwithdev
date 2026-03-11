import { supabase, type ResearchPost } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function ResearchPage() {
  let articles: ResearchPost[] = []

  // Guard against missing Supabase credentials
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const { data, error } = await supabase
      .from('research_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      articles = data
    }
  }

  return (
    <div className="w-full flex flex-col">
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">RESEARCH</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24">
          <h1 className="section-headline mb-16">
            PRODUCT<br />
            THEORY
          </h1>
          
          <div className="flex flex-col">
            {articles.map((article: ResearchPost) => (
              <Link 
                key={article.id}
                href={`/research/${article.slug}`}
                className="group py-12 border-t border-divider first:border-t-0 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <span className="label text-[0.7rem]">{new Date(article.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <ArrowRight className="w-6 h-6 text-divider group-hover:text-blue group-hover:translate-x-2 transition-all" />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black group-hover:text-blue transition-colors uppercase">
                  {article.title}
                </h3>
                
                <p className="max-w-2xl text-xl text-deepgray">
                  {article.summary}
                </p>
              </Link>
            ))}
            {articles.length === 0 && (
              <div className="py-24 border-t border-divider text-left">
                <h3 className="text-3xl font-black uppercase mb-4">Research in progress.</h3>
                <p className="label">No posts published yet. Use the admin panel to add research.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
