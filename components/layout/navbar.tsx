'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { name: 'PROJECTS', href: '/projects' },
    { name: 'RESEARCH', href: '/research' },
    { name: 'PORTFOLIO', href: 'https://devchopra.life/', target: '_blank' },
  ]

  return (
    <nav className="sticky top-0 z-50 h-[80px] bg-[#E3E2DE]/95 backdrop-blur border-b border-[#C7C7C7] flex items-center">
      <div className="w-full px-6 lg:px-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tight uppercase">
          BUILDWITHDEV
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name}
              href={link.href}
              target={link.target}
              className="text-sm font-bold uppercase tracking-widest hover:text-blue transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Slide-down */}
      {isOpen && (
        <div className="absolute top-[80px] left-0 w-full bg-white border-b border-divider animate-in slide-in-from-top duration-300 md:hidden z-40 shadow-xl">
          <div className="flex flex-col p-6 gap-6">
            {links.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                target={link.target}
                onClick={() => setIsOpen(false)}
                className="text-xl font-black uppercase tracking-tight hover:text-blue transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
