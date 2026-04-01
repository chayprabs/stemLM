import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#0F172A14] bg-[#F9FAFB]">
      <div className="mx-auto flex min-h-[64px] max-w-[1100px] flex-col items-center gap-3 px-5 py-5 pb-6 text-center sm:px-5 sm:py-4 sm:pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:text-left md:px-12">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start sm:gap-3">
          <div className="font-wordmark text-base font-semibold tracking-[-0.2px] text-[#0EA5A0]">
            stemLM
          </div>
          <p className="text-xs text-[#94A3B8]">{"\u00A9"} 2026 stemLM</p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#64748B] sm:justify-end sm:gap-x-4 sm:gap-y-1">
          <Link
            href="/privacy"
            className="transition-colors duration-150 hover:text-[#0F1117]"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors duration-150 hover:text-[#0F1117]"
          >
            Terms
          </Link>
          <a
            href="mailto:hello@stemlm.com"
            className="transition-colors duration-150 hover:text-[#0F1117]"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
