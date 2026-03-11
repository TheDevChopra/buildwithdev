import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const RESEARCH_PATH = path.join(process.cwd(), 'content/research')

interface ResearchMetadata {
  slug: string
  title: string
  summary: string
  date: string
}

function getAllResearch(): ResearchMetadata[] {
  if (!fs.existsSync(RESEARCH_PATH)) return []
  const files = fs.readdirSync(RESEARCH_PATH)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = fs.readFileSync(path.join(RESEARCH_PATH, file), 'utf8')
      const { data } = matter(source)
      return {
        ...data,
        slug: file.replace('.mdx', ''),
      } as ResearchMetadata
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function ResearchPage() {
  const articles = getAllResearch()

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
            {articles.map((article) => (
              <Link 
                key={article.slug}
                href={`/research/${article.slug}`}
                className="group py-12 border-t border-divider first:border-t-0 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <span className="label">{article.date}</span>
                  <ArrowRight className="w-6 h-6 text-divider group-hover:text-blue group-hover:translate-x-2 transition-all" />
                </div>
                
                <h3 className="text-4xl md:text-5xl font-black group-hover:text-blue transition-colors">
                  {article.title}
                </h3>
                
                <p className="max-w-2xl text-xl">
                  {article.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
