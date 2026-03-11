import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Edit2, Trash2 } from 'lucide-react'

export default async function AdminProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) console.error('Error fetching products:', error)

  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between items-end border-b border-divider pb-8">
        <div>
          <span className="label">OVERVIEW</span>
          <h1 className="text-5xl font-black uppercase">PRODUCTS</h1>
        </div>
        <Link 
          href="/admin/products/new" 
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          ADD PRODUCT
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products?.map((product) => (
          <div key={product.id} className="bg-white border border-divider p-8 flex justify-between items-center group hover:border-blue transition-colors">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-mutedlabel">{product.slug}</span>
              <h3 className="text-2xl font-black uppercase group-hover:text-blue transition-colors">{product.title}</h3>
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
        {(!products || products.length === 0) && (
          <div className="p-24 border border-dashed border-divider text-center">
            <p className="label">NO PRODUCTS FOUND</p>
          </div>
        )}
      </div>
    </div>
  )
}
