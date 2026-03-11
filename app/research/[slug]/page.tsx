import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

const RESEARCH_PATH = path.join(process.cwd(), 'content/research')

function getResearchBySlug(slug: string) {
  const filePath = path.join(RESEARCH_PATH, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  return { metadata: data, content }
}

export default async function ResearchItemPage({ params }: { params: { slug: string } }) {
  const article = getResearchBySlug(params.slug)
  if (!article) notFound()

  return (
    <div className="w-full flex flex-col">
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">RESEARCH</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24">
          <span className="label mb-8 block">{article.metadata.date as string}</span>
          <h1 className="section-headline mb-16">{article.metadata.title as string}</h1>
          
          <div className="prose max-w-3xl prose-xl prose-jet">
            <MDXRemote source={article.content} />
          </div>
        </div>
      </section>
    </div>
  )
}
