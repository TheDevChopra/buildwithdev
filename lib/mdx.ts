import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects')

export function getProjectCount() {
  if (!fs.existsSync(PROJECTS_PATH)) {
    return 0
  }
  const files = fs.readdirSync(PROJECTS_PATH)
  return files.filter((file) => file.endsWith('.mdx')).length
}

export interface ProjectMetadata {
  slug: string
  title: string
  description: string
  date: string
  github?: string
  demo?: string
  image?: string
}

export function getAllProjects(): ProjectMetadata[] {
  if (!fs.existsSync(PROJECTS_PATH)) return []

  const files = fs.readdirSync(PROJECTS_PATH)
  
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const source = fs.readFileSync(path.join(PROJECTS_PATH, file), 'utf8')
      const { data } = matter(source)
      return {
        ...data,
        slug: file.replace('.mdx', ''),
      } as ProjectMetadata
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProjectBySlug(slug: string) {
  const filePath = path.join(PROJECTS_PATH, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  
  return {
    metadata: { ...data, slug } as ProjectMetadata,
    content,
  }
}
