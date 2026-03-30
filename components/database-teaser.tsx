import Link from "next/link";
import { ArrowRight } from "lucide-react";

type TreeItem =
  | { type: "subject"; name: string; code: string }
  | { type: "chapter"; name: string }
  | { type: "topic"; name: string; key: string }
  | { type: "divider" };

const tree: TreeItem[] = [
  { type: "subject", name: "Physics", code: "PHY" },
  { type: "chapter", name: "Ch 3: Motion in a Plane" },
  { type: "topic", name: "Projectile motion", key: "STEM-PHY-03-07-02" },
  { type: "topic", name: "Circular motion", key: "STEM-PHY-03-08-01" },
  { type: "chapter", name: "Ch 5: Laws of Motion" },
  { type: "topic", name: "Newton's second law", key: "STEM-PHY-05-02-01" },
  { type: "divider" },
  { type: "subject", name: "Mathematics", code: "MATH" },
  { type: "chapter", name: "Ch 1: Algebra" },
  { type: "topic", name: "Quadratic equations", key: "STEM-MATH-01-04-01" },
  { type: "divider" },
  { type: "subject", name: "Computer science", code: "CS" },
  { type: "chapter", name: "Ch 2: Algorithms" },
  { type: "topic", name: "Merge sort", key: "STEM-CS-02-08-01" },
];

export function DatabaseTeaser() {
  return (
    <section className="mx-auto max-w-[1100px] px-5 py-6 md:px-12">
      <div className="grid grid-cols-1 items-center gap-12 rounded-xl bg-[#141418] p-8 lg:grid-cols-2 md:p-12">
        <div>
          <h2 className="mb-4 text-2xl font-medium leading-[1.15] tracking-[-0.3px] text-[#F0F0F2]">
            Every topic. Every method. Mapped.
          </h2>

          <p className="mb-8 max-w-[420px] text-base text-[#8A8A9A]">
            The stemLM database covers thousands of STEM topics across physics,
            chemistry, mathematics, biology, computer science, and engineering,
            each with an exact solving framework built in.
          </p>

          <div className="mb-8 flex items-center gap-0">
            <div className="px-8 text-center first:pl-0 last:pr-0">
              <div className="text-2xl font-medium text-[#0EA5A0]">8</div>
              <div className="mt-1 text-xs text-[#8A8A9A]">Subjects</div>
            </div>
            <div className="h-8 w-px bg-[#1E1E24]" />
            <div className="px-8 text-center first:pl-0 last:pr-0">
              <div className="text-2xl font-medium text-[#0EA5A0]">200+</div>
              <div className="mt-1 text-xs text-[#8A8A9A]">Chapters</div>
            </div>
            <div className="h-8 w-px bg-[#1E1E24]" />
            <div className="px-8 text-center first:pl-0 last:pr-0">
              <div className="text-2xl font-medium text-[#0EA5A0]">4,000+</div>
              <div className="mt-1 text-xs text-[#8A8A9A]">Frameworks</div>
            </div>
          </div>

          <Link
            href="/database"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0EA5A0] transition-colors duration-150 hover:text-[#0D9490]"
          >
            <span>Browse the full database</span>
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
          </Link>
        </div>

        <div className="rounded-lg bg-[#1A1A22] p-6 font-mono text-sm">
          {tree.map((item, index) => {
            if (item.type === "divider") {
              return <div key={`divider-${index}`} className="my-2 border-t border-[#1E1E24]" />;
            }

            if (item.type === "subject") {
              return (
                <div
                  key={`${item.type}-${item.name}`}
                  className="mb-1 flex h-8 items-center justify-between"
                >
                  <span className="font-sans text-sm font-medium text-[#F0F0F2]">{item.name}</span>
                  <span className="rounded-sm bg-[#0EA5A015] px-2 py-1 text-xs text-[#0EA5A0]">
                    {item.code}
                  </span>
                </div>
              );
            }

            if (item.type === "chapter") {
              return (
                <div
                  key={`${item.type}-${item.name}`}
                  className="flex h-8 items-center justify-between pl-4 text-xs text-[#8A8A9A]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#2A2A35]">├─</span>
                    <span>{item.name}</span>
                  </div>
                  <span />
                </div>
              );
            }

            return (
              <div
                key={`${item.type}-${item.key}`}
                className="flex h-8 items-center justify-between pl-8 text-xs text-[#8A8A9A]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#2A2A35]">└─</span>
                  <span>{item.name}</span>
                </div>
                <span className="rounded-sm bg-[#0EA5A015] px-2 py-1 text-xs text-[#0EA5A0]">
                  {item.key}
                </span>
              </div>
            );
          })}

          <span className="ml-8 inline-block h-4 w-px animate-pulse bg-[#0EA5A0]" />
        </div>
      </div>
    </section>
  );
}
