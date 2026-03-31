import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#0F172A14] bg-[#F9FAFB]">
      <div className="mx-auto flex min-h-[64px] max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-12">
        <div className="flex items-center gap-3">
          <div className="font-wordmark text-base font-semibold tracking-[-0.2px] text-[#0EA5A0]">
            stemLM
          </div>
          <p className="text-xs text-[#94A3B8]">{"\u00A9"} 2026 stemLM</p>
        </div>

        <nav className="flex items-center text-xs text-[#64748B]">
          <Link
            href="/privacy"
            className="transition-colors duration-150 hover:text-[#0F1117]"
          >
            Privacy
          </Link>
          <span className="px-3 text-[#CBD5E1]">&middot;</span>
          <Link
            href="/terms"
            className="transition-colors duration-150 hover:text-[#0F1117]"
          >
            Terms
          </Link>
          <span className="px-3 text-[#CBD5E1]">&middot;</span>
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
