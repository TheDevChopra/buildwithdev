'use client'

import { getSupabase, type Product } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Loader2, AlertCircle } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const fetchProducts = useCallback(async () => {
    try {
      const supabase = getSupabase()
      if (!supabase) {
        setError('Database configuration missing.')
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        console.error('Error fetching products:', fetchError)
        setError('Could not load products. Please refresh.')
      } else {
        setProducts(data || [])
        setError('')
      }
    } catch (e) {
      console.error('Unexpected error:', e)
      setError('Something went wrong. Please refresh.')
    } finally {
      setLoading(false)
    }
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
    setDeletingId(id)
    setConfirmDeleteId(null)
    setError('')

    try {
      const supabase = getSupabase()
      if (!supabase) {
        setError('Database configuration missing.')
        setDeletingId(null)
        return
      }

      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (deleteError) {
        console.error('Delete error:', deleteError)
        setError('Could not delete product. Please try again.')
        setDeletingId(null)
      } else {
        // Optimistically remove from local list immediately
        setProducts(prev => prev.filter(p => p.id !== id))
        setDeletingId(null)
      }
    } catch (e) {
      console.error('Unexpected delete error:', e)
      setError('Something went wrong. Please try again.')
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

      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 flex gap-3 items-center">
          <AlertCircle className="text-red-600 w-4 h-4 flex-shrink-0" />
          <p className="text-red-600 font-bold uppercase text-[10px] tracking-widest">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="p-24 flex flex-col items-center gap-4 border border-divider">
            <Loader2 className="w-8 h-8 animate-spin text-blue" />
            <p className="label">SYNCING DATABASE...</p>
          </div>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.id} className="bg-white border border-divider p-6 md:p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 group hover:border-blue transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-mutedlabel">{product.slug}</span>
                  <h3 className="text-xl md:text-2xl font-black uppercase group-hover:text-blue transition-colors">{product.title}</h3>
                  <p className="text-xs text-mutedlabel">Created: {new Date(product.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {confirmDeleteId === product.id ? (
                    <div className="flex items-center gap-2 border border-red-200 bg-red-50 p-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-700">Delete?</span>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="text-[10px] font-black uppercase tracking-widest text-white bg-red-600 px-3 py-1.5 hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {deletingId === product.id ? <Loader2 size={12} className="animate-spin" /> : 'YES'}
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-[10px] font-black uppercase tracking-widest text-mutedlabel px-3 py-1.5 border border-divider hover:bg-divider transition-colors"
                      >
                        NO
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="p-3 border border-divider hover:bg-jet hover:text-cream transition-colors"
                        title="Edit product"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => setConfirmDeleteId(product.id)}
                        disabled={deletingId === product.id}
                        className="p-3 border border-divider hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                        title="Delete product"
                      >
                        {deletingId === product.id
                          ? <Loader2 size={18} className="animate-spin" />
                          : <Trash2 size={18} />
                        }
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <div className="p-24 border border-dashed border-divider text-center">
                <p className="label">NO PRODUCTS YET</p>
                <p className="text-sm text-mutedlabel mt-2">Add your first product using the button above.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
