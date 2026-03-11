import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  title: string
  slug: string
  description: string
  video_url: string
  github_url: string
  tech_stack: string
  prompts: string
  architecture: string
  thumbnail: string
  created_at: string
}

export type ResearchPost = {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  created_at: string
}
