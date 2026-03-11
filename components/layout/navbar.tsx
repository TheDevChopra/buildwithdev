import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-[80px] bg-[#E3E2DE]/95 backdrop-blur border-b border-[#C7C7C7] flex items-center">
      <div className="grid-layout px-6 md:px-12">
        <div className="col-span-3">
          <Link href="/" className="text-xl font-black tracking-tight uppercase">
            BUILDWITHDEV
          </Link>
        </div>
        
        <div className="col-span-6 hidden md:block">
          {/* Status indicators can go here */}
        </div>
        
        <div className="col-span-3 flex justify-end gap-8">
          <Link href="/projects" className="text-sm font-bold uppercase tracking-widest hover:text-blue transition-colors">
            PROJECTS
          </Link>
          <Link href="/research" className="text-sm font-bold uppercase tracking-widest hover:text-blue transition-colors">
            RESEARCH
          </Link>
          <Link 
            href="https://devchopra.life/" 
            target="_blank"
            className="text-sm font-bold uppercase tracking-widest hover:text-blue transition-colors"
          >
            PORTFOLIO
          </Link>
        </div>
      </div>
    </nav>
  )
}
