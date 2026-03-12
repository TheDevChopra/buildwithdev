'use client'

import { useState, useEffect } from 'react'
import { getSupabase } from '@/lib/supabase'

export default function ProductCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCount() {
      const supabase = getSupabase()
      if (!supabase) return

      const { count: supabaseCount, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
      
      if (!error && supabaseCount !== null) {
        setCount(supabaseCount)
      }
    }
    
    fetchCount()

    const supabase = getSupabase()
    if (!supabase) return

    const channel = supabase
      .channel('counter-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchCount()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const targetCount = 30
  const currentCount = count || 0
  const progress = Math.min((currentCount / targetCount) * 100, 100)

  return (
    <div className="mt-8 md:mt-12 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight leading-none uppercase">
            {currentCount.toString().padStart(2, '0')} <span className="text-blue">/</span> {targetCount}
          </h2>
          <span className="label pb-1 md:pb-2">PRODUCTS BUILT</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-4 md:h-6 border-2 border-jet mt-2 relative overflow-hidden">
          <div 
            className="h-full bg-blue transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2">
          <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-deepgray">
            PHASE 01: DISCOVERY
          </span>
          <span className="text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-deepgray">
            {Math.round(progress)}% COMPLETE
          </span>
        </div>
      </div>
    </div>
  )
}
