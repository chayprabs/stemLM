import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t border-[#E2E8F0] bg-[#FFFFFF] px-5 py-6 sm:flex-row md:px-12">
      <div className="flex flex-col gap-1">
        <div className="font-wordmark text-base font-medium">
          <span className="text-[#64748B]">stem</span>
          <span className="text-[#0EA5A0]">LM</span>
        </div>
        <p className="text-xs text-[#4A4A5A]">{"\u00A9"} 2026 stemLM</p>
      </div>

      <div className="flex gap-6">
        <Link
          href="/privacy"
          className="text-sm text-[#64748B] transition-colors duration-150 hover:text-[#0F1117]"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="text-sm text-[#64748B] transition-colors duration-150 hover:text-[#0F1117]"
        >
          Terms
        </Link>
        <a
          href="mailto:hello@stemlm.com"
          className="text-sm text-[#64748B] transition-colors duration-150 hover:text-[#0F1117]"
        >
          Contact
        </a>
      </div>
    </footer>
  );
}
