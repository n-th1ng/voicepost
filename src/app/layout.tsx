import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VoicePost - LinkedIn Content Engine",
  description: "Generate high-performing LinkedIn content using proven frameworks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className + " bg-zinc-950 text-zinc-100 min-h-screen"}>
        <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
              VoicePost
            </a>
            <div className="flex gap-6 text-sm">
              <a href="/generate" className="text-zinc-400 hover:text-white transition">Generate</a>
              <a href="/profile" className="text-zinc-400 hover:text-white transition">Profile</a>
              <a href="/calendar" className="text-zinc-400 hover:text-white transition">Calendar</a>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
