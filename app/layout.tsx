import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "@/app/globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500"],
});

const wordmark = Inter({
  subsets: ["latin"],
  variable: "--font-wordmark",
  weight: ["500"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "stemLM | Step-by-step STEM with visual reasoning",
  description:
    "stemLM turns AI into a structured STEM tutor with guided steps, diagrams, and a functional study workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${wordmark.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
