import Link from 'next/link'
import { ShoppingBag, BookOpen, LogOut } from 'lucide-react'

export default function AdminSidebar() {
  return (
    <div className="w-64 h-screen border-r border-divider bg-white flex flex-col p-8">
      <div className="mb-12">
        <span className="text-xl font-black uppercase tracking-tight">ADMIN PANEL</span>
      </div>
      
      <nav className="flex-grow flex flex-col gap-4">
        <SidebarLink href="/admin/products" icon={<ShoppingBag size={18} />} label="PRODUCTS" />
        <SidebarLink href="/admin/research" icon={<BookOpen size={18} />} label="RESEARCH" />
      </nav>
      
      <div className="pt-8 border-t border-divider">
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#7A7A7A] hover:text-jet transition-colors">
            <LogOut size={18} />
            LOGOUT
          </button>
        </form>
      </div>
    </div>
  )
}

function SidebarLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#7A7A7A] hover:text-jet transition-colors group"
    >
      <span className="group-hover:text-blue transition-colors">{icon}</span>
      {label}
    </Link>
  )
}
