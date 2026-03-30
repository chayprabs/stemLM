"use client";

import Image from "next/image";
import { useState } from "react";

const universities = [
  { name: "IIT Bombay", domain: "iitb.ac.in" },
  { name: "IIT Delhi", domain: "iitd.ac.in" },
  { name: "IIT Madras", domain: "iitm.ac.in" },
  { name: "IISc Bangalore", domain: "iisc.ac.in" },
  { name: "MIT", domain: "mit.edu" },
  { name: "Stanford", domain: "stanford.edu" },
  { name: "Caltech", domain: "caltech.edu" },
  { name: "Georgia Tech", domain: "gatech.edu" },
  { name: "Tsinghua University", domain: "tsinghua.edu.cn" },
  { name: "Peking University", domain: "pku.edu.cn" },
  { name: "Zhejiang University", domain: "zju.edu.cn" },
  { name: "USTC", domain: "ustc.edu.cn" },
] as const;

function UniversityLogo({
  name,
  domain,
}: {
  name: string;
  domain: string;
}) {
  const [showFallback, setShowFallback] = useState(false);

  return (
    <div className="group flex cursor-default flex-col items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center">
        {!showFallback ? (
          <Image
            src={`https://logo.clearbit.com/${domain}`}
            alt={name}
            width={48}
            height={48}
            className="object-contain grayscale opacity-50 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
            onError={() => setShowFallback(true)}
          />
        ) : (
          <span className="text-sm font-medium text-[#0EA5A0]">{name}</span>
        )}
      </div>
      <span className="max-w-[80px] text-center text-xs leading-[1.5] text-[#8A8A9A] transition-colors duration-150 group-hover:text-[#64748B]">
        {name}
      </span>
    </div>
  );
}

export function UniversityStrip() {
  return (
    <section className="border-y border-[#E2E8F0] bg-[#FFFFFF] px-5 py-8 md:px-12 md:py-10">
      <p className="mb-8 text-center text-sm text-[#64748B]">Used by students at</p>

      <div className="mx-auto grid max-w-[900px] grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-6">
        {universities.map((university) => (
          <UniversityLogo
            key={university.name}
            name={university.name}
            domain={university.domain}
          />
        ))}
      </div>
    </section>
  );
}
