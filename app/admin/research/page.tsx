import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export default async function AdminResearchPage() {
  const { data: posts, error } = await supabase
    .from('research_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) console.error('Error fetching research posts:', error)

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end border-b border-divider pb-8">
        <div>
          <span className="label">OVERVIEW</span>
          <h1 className="text-5xl font-black uppercase">RESEARCH</h1>
        </div>
        <Link 
          href="/admin/research/new" 
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          ADD POST
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts?.map((post) => (
          <div key={post.id} className="bg-white border border-divider p-8 flex justify-between items-center group hover:border-blue transition-colors">
            <div className="flex flex-col gap-2">
              <span className="label text-[0.6rem]">{new Date(post.created_at).toLocaleDateString()}</span>
              <h3 className="text-2xl font-black uppercase group-hover:text-blue transition-colors">{post.title}</h3>
            </div>
            
            <div className="flex gap-4">
              <button className="p-3 border border-divider hover:bg-jet hover:text-cream transition-colors">
                <Edit2 size={18} />
              </button>
              <button className="p-3 border border-divider hover:bg-red-600 hover:text-white transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="p-24 border border-dashed border-divider text-center">
            <p className="label">NO RESEARCH POSTS FOUND</p>
          </div>
        )}
      </div>
    </div>
  )
}
