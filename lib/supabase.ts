import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseInstance: SupabaseClient | null = null

export const getSupabase = () => {
  if (supabaseInstance) return supabaseInstance

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return null if credentials are missing
    // This allows the build to bypass createClient entirely
    return null
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e)
    return null
  }
}

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
