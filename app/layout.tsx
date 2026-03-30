import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  DM_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Syne,
} from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
});

const display = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

const heading = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
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
    <html lang="en">
      <body
        className={`${sans.variable} ${display.variable} ${heading.variable} ${mono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
