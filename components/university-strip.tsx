"use client"

const universities = [
  { name: 'IIT Bombay', color: '#00457C' },
  { name: 'IIT Delhi', color: '#003087' },
  { name: 'IIT Madras', color: '#8B0000' },
  { name: 'IISc Bangalore', color: '#1B4F72' },
  { name: 'MIT', color: '#A31F34' },
  { name: 'Stanford', color: '#8C1515' },
  { name: 'Caltech', color: '#FF6C00' },
  { name: 'Georgia Tech', color: '#B3A369' },
  { name: 'Tsinghua University', color: '#660874' },
  { name: 'Peking University', color: '#8E0000' },
  { name: 'Zhejiang University', color: '#003F8A' },
  { name: 'USTC', color: '#003087' },
] as const

export function UniversityStrip() {
  return (
    <section className="border-b border-t border-[#E2E8F0] bg-white px-5 py-8 md:px-12 md:py-10">
      <p className="mb-8 text-center text-[13px] text-[#64748B]">Used by students at</p>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12 md:gap-y-6">
        {universities.map((university) => (
          <div key={university.name} className="group cursor-default">
            <span
              className="text-[15px] font-medium tracking-[-0.2px] transition-colors duration-300"
              style={{ color: '#4A4A5A' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = university.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4A4A5A'
              }}
            >
              {university.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
