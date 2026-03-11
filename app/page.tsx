import Link from 'next/link'
import ProductCounter from '@/components/product/product-counter'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* HERO SECTION */}
      <section className="min-h-[85vh] grid grid-cols-1 md:grid-cols-12 border-b border-divider">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-6 md:p-12 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4">
          <span className="label">MANIFESTO</span>
          <div className="w-3 h-3 md:w-4 md:h-4 bg-jet" />
        </div>
        
        <div className="md:col-span-9 p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <h1 className="section-headline">
            BUILDING CRAZY<br />
            INTERNET<br />
            <span className="text-blue">PRODUCTS</span>
          </h1>
          
          <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="lg:col-span-7 max-w-[500px]">
              <p className="text-base md:text-lg leading-relaxed text-deepgray">
                I&apos;m Dev Chopra. I&apos;m experimenting with building 30+ SaaS, web apps, and internet tools in public. 
                Every product includes the idea, UI design, prompts, architecture, and GitHub repository.
              </p>
              <ProductCounter />
            </div>
            
            <div className="lg:col-span-5 flex flex-col items-start gap-4">
              <Link href="/projects" className="btn-primary flex items-center gap-4 group w-full">
                EXPLORE PRODUCTS
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link href="/research" className="btn-secondary w-full">
                READ RESEARCH
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-divider">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-6 md:p-12">
          <span className="label">SYSTEM</span>
        </div>
        
        <div className="md:col-span-9 section-padding">
          <h2 className="section-headline mb-12 md:mb-16">
            IDEA<br />
            BUILD<br />
            SHIP
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-divider">
            {[
              { id: '01', title: 'UI SYSTEM', text: 'Every product begins with a structured UI system and layout grid.' },
              { id: '02', title: 'PROMPT ENGINEERING', text: 'AI prompts and generation techniques used to build the product.' },
              { id: '03', title: 'OPEN BUILD LOG', text: 'All products include architecture notes and GitHub repositories.' }
            ].map((item) => (
              <div key={item.id} className="border-r border-b border-divider p-8 hover:bg-white transition-colors duration-300 group">
                <span className="font-mono text-sm text-mutedlabel mb-4 block">{item.id}</span>
                <h3 className="text-xl md:text-2xl font-black mb-4 group-hover:text-blue transition-colors uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-deepgray leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-divider">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-6 md:p-12">
          <span className="label">WHY DIFFERENT</span>
        </div>
        
        <div className="md:col-span-9">
          {[
            'EVERY PRODUCT HAS A PUBLIC GITHUB',
            'PROMPTS AND BUILD SYSTEMS ARE SHARED',
            'REAL PRODUCTS — NOT JUST IDEAS',
            'RESEARCH DRIVEN EXPERIMENTS'
          ].map((text, idx) => (
            <div 
              key={idx} 
              className="group min-h-[100px] md:h-[150px] border-b border-divider last:border-b-0 flex items-center p-8 md:p-12 cursor-default"
            >
              <span className="font-mono text-xs md:text-sm text-mutedlabel mr-6 md:mr-12">0{idx + 1}</span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black transition-colors duration-300 group-hover:text-blue leading-none tracking-tight">
                {text}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESS SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b border-divider min-h-[50vh]">
        <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-divider p-6 md:p-12">
          <span className="label">ACCESS</span>
        </div>
        
        <div className="md:col-span-9 p-8 md:p-16 lg:p-24 flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <h2 className="section-headline">START EXPLORING</h2>
            <p className="mt-6 md:mt-8 text-lg md:text-2xl max-w-2xl text-deepgray leading-relaxed">
              Browse products, prompts, and research notes. <br className="hidden md:block" />
              Take the ideas. Build your own.
            </p>
          </div>
          
          <div className="flex lg:justify-end mt-12 md:mt-16">
            <Link 
              href="/projects" 
              className="bg-jet text-cream px-10 py-6 md:px-16 md:py-10 font-black text-xl md:text-3xl hover:bg-blue transition-colors duration-300 w-full lg:w-auto text-center uppercase tracking-tighter"
            >
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
