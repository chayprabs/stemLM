"use client";

import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "700",
});

const sizeClasses = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
} as const;

type LogoSize = keyof typeof sizeClasses;

interface LogoProps {
  size?: LogoSize;
}

export default function Logo({ size = "md" }: LogoProps) {
  return (
    <span
      className={`${spaceMono.className} inline-flex items-center whitespace-nowrap leading-none tracking-[-0.02em] ${sizeClasses[size]}`}
    >
      <span className="text-[#0F1117]">stem</span>
      <span className="text-[#2dd4bf]">LM</span>
      <span
        aria-hidden="true"
        className="logo-cursor-blink ml-[1px] inline-block h-[0.68em] w-[3px] bg-[#2dd4bf]"
      />
    </span>
  );
}
