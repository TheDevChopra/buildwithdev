'use client'

import { getSupabase, type Product } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    const supabase = getSupabase()
    if (!supabase) return

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()

    const supabase = getSupabase()
    if (!supabase) return

    const channel = supabase
      .channel('admin-products-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProducts()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchProducts])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    setDeletingId(id)
    const supabase = getSupabase()
    if (!supabase) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting product: ' + error.message)
      setDeletingId(null)
    } else {
      // Realtime listener will handle list update
      setDeletingId(null)
    }
  }

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
        {loading ? (
          <div className="p-24 flex flex-col items-center gap-4 border border-divider">
            <Loader2 className="w-8 h-8 animate-spin text-blue" />
            <p className="label">SYNCING DATABASE...</p>
          </div>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-divider p-8 flex justify-between items-center group hover:border-blue transition-colors">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-xs text-mutedlabel">{product.slug}</span>
                  <h3 className="text-2xl font-black uppercase group-hover:text-blue transition-colors">{product.title}</h3>
                  <p className="text-xs text-mutedlabel">Created: {new Date(product.created_at).toLocaleDateString()}</p>
                </div>
                
                <div className="flex gap-4">
                  <Link 
                    href={`/admin/products/edit/${product.id}`}
                    className="p-3 border border-divider hover:bg-jet hover:text-cream transition-colors"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className="p-3 border border-divider hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {deletingId === product.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="p-24 border border-dashed border-divider text-center">
                <p className="label">NO PRODUCTS FOUND</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
