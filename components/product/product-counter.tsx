'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProductCounter() {
  const [count, setCount] = useState(0)
  const goal = 30

  useEffect(() => {
    async function fetchCount() {
      // Guard against missing Supabase credentials
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return
      }

      const { count: supabaseCount, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
      
      if (!error && supabaseCount !== null) {
        setCount(supabaseCount)
      }
    }
    fetchCount()
  }, [])

  const formattedCount = count.toString().padStart(2, '0')
  const progress = (count / goal) * 100

  return (
    <div className="flex flex-col gap-4 w-full max-w-[300px]">
      <div className="flex justify-between items-end">
        <span className="text-4xl font-black">{formattedCount} / {goal}</span>
        <span className="label text-[0.65rem] pb-1">PRODUCTS BUILT</span>
      </div>
      <div className="w-full h-1 bg-divider">
        <div 
          className="h-full bg-blue transition-all duration-1000 ease-out" 
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  )
}
