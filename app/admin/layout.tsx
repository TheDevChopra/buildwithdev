import AdminSidebar from '@/components/admin/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex bg-[#F5F5F4] min-h-screen">
      <AdminSidebar />
      <main className="flex-grow p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
