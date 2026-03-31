"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface NavProps {
  onOpenModal: () => void
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
      className={`sticky top-0 z-50 w-full ${
        isScrolled ? 'border-b border-[#E2E8F0] bg-[#FFFFFF]/90 backdrop-blur-sm' : 'bg-[#FFFFFF]'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-5 lg:px-12">
          <Link
            href="/"
            className="font-wordmark text-[15px] font-medium text-[#0F1117]"
            aria-label="stemLM home"
          >
            <span>stem</span>
            <span className="text-[#0EA5A0]">LM</span>
          </Link>

          <button
            type="button"
            onClick={onOpenModal}
            className="rounded-md bg-[#0EA5A0] px-3.5 py-2 text-[13px] font-medium text-[#F0F0F2] transition-colors duration-150 hover:bg-[#0D9490] sm:px-4 sm:text-sm"
          >
            Join the waitlist
          </button>
      </div>
    </header>
  )
}
