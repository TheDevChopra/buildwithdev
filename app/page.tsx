import Link from 'next/link'
import ProductCounter from '@/components/product/product-counter'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      {/* HERO SECTION */}
      <section className="min-h-[85vh] grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12 flex flex-col items-start gap-4">
          <span className="label">MANIFESTO</span>
          <div className="w-4 h-4 bg-jet" />
        </div>
        
        <div className="col-span-9 p-12 md:p-24 flex flex-col justify-center">
          <h1 className="hero-headline">
            BUILDING CRAZY<br />
            INTERNET<br />
            <span className="text-blue">PRODUCTS</span>
          </h1>
          
          <div className="mt-12 grid grid-cols-2 gap-12 items-end">
            <div className="max-w-[420px]">
              <p>
                I&apos;m Dev Chopra. I&apos;m experimenting with building 30+ SaaS, web apps, and internet tools in public. 
                Every product includes the idea, UI design, prompts, architecture, and GitHub repository.
              </p>
              <ProductCounter />
            </div>
            
            <div className="flex flex-col items-start gap-6 pb-8">
              <Link href="/projects" className="btn-primary flex items-center gap-4 group">
                EXPLORE PRODUCTS
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link href="https://devchopra.life/" target="_blank" className="btn-secondary uppercase tracking-[0.2em] text-xs">
                READ RESEARCH
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM SECTION */}
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">SYSTEM</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24">
          <h2 className="section-headline mb-16">
            IDEA<br />
            BUILD<br />
            SHIP
          </h2>
          
          <div className="grid grid-cols-3">
            {[
              { id: '01', title: 'UI SYSTEM', text: 'Every product begins with a structured UI system and layout grid.' },
              { id: '02', title: 'PROMPT ENGINEERING', text: 'AI prompts and generation techniques used to build the product.' },
              { id: '03', title: 'OPEN BUILD LOG', text: 'All products include architecture notes and GitHub repositories.' }
            ].map((item) => (
              <div key={item.id} className="border border-divider p-8 hover:bg-white/20 transition-colors duration-300 group">
                <span className="font-mono text-sm text-mutedlabel mb-4 block">{item.id}</span>
                <h3 className="text-2xl font-black mb-4 group-hover:text-blue transition-colors">{item.title}</h3>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT SECTION */}
      <section className="grid-layout border-b border-divider">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">WHY DIFFERENT</span>
        </div>
        
        <div className="col-span-9">
          {[
            'EVERY PRODUCT HAS A PUBLIC GITHUB',
            'PROMPTS AND BUILD SYSTEMS ARE SHARED',
            'REAL PRODUCTS — NOT JUST IDEAS',
            'RESEARCH DRIVEN EXPERIMENTS'
          ].map((text, idx) => (
            <div 
              key={idx} 
              className="group h-[150px] border-b border-divider last:border-b-0 flex items-center p-12 cursor-default"
            >
              <span className="font-mono text-sm text-mutedlabel mr-12">0{idx + 1}</span>
              <h3 className="text-4xl md:text-5xl font-black transition-colors duration-300 group-hover:text-blue">
                {text}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* ACCESS SECTION */}
      <section className="grid-layout border-b border-divider min-h-[50vh]">
        <div className="col-span-3 border-r border-divider p-12">
          <span className="label">ACCESS</span>
        </div>
        
        <div className="col-span-9 p-12 md:p-24 flex flex-col justify-between">
          <div>
            <h2 className="section-headline">START EXPLORING</h2>
            <p className="mt-8 text-2xl max-w-2xl">
              Browse products, prompts, and research notes. <br />
              Take the ideas. Build your own.
            </p>
          </div>
          
          <div className="flex justify-end mt-12">
            <Link href="/projects" className="bg-jet text-cream px-12 py-8 font-black text-2xl hover:bg-blue transition-colors duration-300">
              VIEW PRODUCTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
