import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bharatdefence.network"),
  title: {
    default: "Bharat Defence Network — India's Defence Innovation Ecosystem",
    template: "%s · Bharat Defence Network",
  },
  description:
    "A national innovation layer for defence. Problems, projects, startups, grants, patents and builders — connected through one serious, strategic ecosystem.",
  keywords: [
    "defence innovation",
    "india defence tech",
    "startup ecosystem",
    "DPSU",
    "iDEX",
    "defence problems",
    "capability building",
  ],
  openGraph: {
    title: "Bharat Defence Network",
    description:
      "India's defence innovation ecosystem. Problems, projects, startups, grants, patents — unified.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
