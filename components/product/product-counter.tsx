import { getProjectCount } from '@/lib/mdx'

export default function ProductCounter() {
  const count = getProjectCount()
  const formattedCount = count.toString().padStart(2, '0')
  const totalGoal = 30
  
  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex items-baseline gap-4">
        <span className="text-4xl md:text-6xl font-black text-jet">
          {formattedCount} <span className="text-blue">/ {totalGoal}</span>
        </span>
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="label">PRODUCTS BUILT</span>
        <div className="w-full h-[2px] bg-[#C7C7C7]">
          <div 
            className="h-full bg-blue transition-all duration-1000 ease-linear"
            style={{ width: `${(count / totalGoal) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
