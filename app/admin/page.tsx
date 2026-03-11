'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        router.push('/admin/products')
      } else {
        const data = await response.json()
        setError(data.message || 'Invalid password')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md border border-divider shadow-2xl bg-white overflow-hidden">
        <div className="p-8 md:p-12 border-b border-divider flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-jet flex items-center justify-center">
            <Lock className="text-cream w-8 h-8" />
          </div>
          <div className="text-center">
            <span className="label">SECURE GATEWAY</span>
            <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter">ADMIN ACCESS</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 md:p-12 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <label className="label">PASSWORD</label>
              <span className="text-[10px] text-mutedlabel font-mono">AUTH_REQUIRED</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-divider bg-[#F5F5F4] focus:outline-none focus:border-blue font-mono text-center tracking-widest"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 p-3 border border-red-100 flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-red-600 animate-pulse" />
              <p className="text-red-600 text-[10px] font-black uppercase tracking-widest">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full group"
          >
            {loading ? 'VERIFYING...' : (
              <>
                SIGN IN <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="p-6 bg-divider/10 border-t border-divider text-center">
          <p className="label text-[10px] tracking-[0.3em]">ENCRYPTED_SESSION_v1.0</p>
        </div>
      </div>
    </div>
  )
}
