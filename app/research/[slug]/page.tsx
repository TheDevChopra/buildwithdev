import { getSupabase } from '@/lib/supabase'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ResearchItemPage({ params }: { params: { slug: string } }) {
  let article = null

  // Guard against missing Supabase credentials
  const supabase = getSupabase()
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('research_posts')
        .select('*')
        .eq('slug', params.slug)
        .single()
      
      if (!error && data) {
        article = data
      }
    } catch (e) {
      console.error('Build-time fetch skipped or failed:', e)
    }
  }

  if (!article) notFound()

  return (
    <div className="w-full flex flex-col">
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">RESEARCH</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24">
          <span className="label mb-8 block">{new Date(article.created_at).toLocaleDateString()}</span>
          <h1 className="section-headline mb-16 uppercase">{article.title}</h1>
          
          <div className="prose max-w-3xl prose-xl prose-jet">
            <MDXRemote source={article.content} />
          </div>
        </div>
      </section>
    </div>
  )
}
