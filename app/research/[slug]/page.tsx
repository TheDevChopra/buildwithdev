import { getSupabase } from '@/lib/supabase'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import ProjectLayout, { ProjectSection } from '@/components/product/project-layout'

export const dynamic = 'force-dynamic'

export default async function ResearchItemPage({ params }: { params: { slug: string } }) {
  let article = null

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
    <ProjectLayout 
      label="RESEARCH POST"
      title={article.title} 
      description={article.summary}
    >
      <ProjectSection title="Content">
        <div className="prose prose-lg md:prose-xl prose-jet max-w-none">
          <MDXRemote source={article.content} />
        </div>
      </ProjectSection>
      
      <div className="pt-12 border-t border-divider">
        <span className="label">PUBLISHED: {new Date(article.created_at).toLocaleDateString()}</span>
      </div>
    </ProjectLayout>
  )
}
