"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavProps {
  onOpenModal: () => void
}

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function Nav({ onOpenModal }: NavProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 60)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 h-16 w-full px-5 md:px-12 ${
        isScrolled ? 'border-b border-[#E2E8F0] bg-[#FFFFFF]/90 backdrop-blur-sm' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="flex h-full w-full items-center justify-between">
        <Link
          href="/"
          className="font-wordmark text-[15px] font-medium text-[#0F1117]"
          aria-label="stemLM home"
        >
          <span>stem</span>
          <span className="text-[#0EA5A0]">LM</span>
        </Link>

        <div className="hidden items-center gap-x-8 md:flex">
          <button
            type="button"
            onClick={() => scrollToSection('how-it-works')}
            className="text-[13px] text-[#64748B] transition-colors duration-150 hover:text-[#0F1117]"
          >
            How it works
          </button>
          <Link
            href="/database"
            className="text-[13px] text-[#64748B] transition-colors duration-150 hover:text-[#0F1117]"
          >
            Database
          </Link>
          <button
            type="button"
            onClick={() => scrollToSection('extension')}
            className="text-[13px] text-[#64748B] transition-colors duration-150 hover:text-[#0F1117]"
          >
            Extension
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden text-[13px] text-[#64748B] transition-colors duration-150 hover:text-[#0F1117] md:inline-flex"
          >
            Log in
          </button>
          <button
            type="button"
            onClick={onOpenModal}
            className="rounded-md bg-[#0EA5A0] px-4 py-2 text-sm font-medium text-[#F0F0F2] transition-colors duration-150 hover:bg-[#0D9490]"
          >
            Get early access
          </button>
        </div>
      </div>
    </header>
  )
}
