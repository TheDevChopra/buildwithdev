import React from 'react'

interface ProjectLayoutProps {
  label?: string
  title: string
  description?: string
  children: React.ReactNode
  videoSlot?: React.ReactNode
}

export default function ProjectLayout({ 
  label = "PRODUCT", 
  title, 
  description, 
  children,
  videoSlot 
}: ProjectLayoutProps) {
  return (
    <div className="w-full">
      {/* Hero Content */}
      <section className="section-padding border-b border-divider">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div className="flex flex-col">
            <span className="label mb-4">{label}</span>
            <h1 className="font-black text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] uppercase text-jet">
              {title}
            </h1>
            {description && (
              <p className="mt-8 text-base md:text-lg leading-relaxed text-deepgray max-w-2xl">
                {description}
              </p>
            )}
            
            {/* Project Content (Architecture, Tech Stack, etc.) */}
            <div className="mt-16 space-y-16">
              {children}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {videoSlot && (
              <div className="aspect-video w-full border border-divider bg-white p-1">
                <div className="w-full h-full bg-divider">
                  {videoSlot}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export function ProjectSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-jet uppercase mb-6 flex items-center gap-4">
        <span className="w-2 h-2 bg-blue" />
        {title}
      </h2>
      <div className="text-base leading-relaxed text-deepgray max-w-3xl whitespace-pre-wrap">
        {children}
      </div>
    </div>
  )
}
