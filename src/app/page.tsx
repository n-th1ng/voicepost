"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Calendar, User, ArrowRight, Zap, Shield, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-gray-950 to-pink-950/40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-5">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          VoicePost
        </Link>
        <div className="flex gap-3">
          <Link href="/generate">
            <Button variant="ghost" className="text-gray-400 hover:text-white">Generate</Button>
          </Link>
          <Link href="/calendar">
            <Button variant="ghost" className="text-gray-400 hover:text-white">Calendar</Button>
          </Link>
          <Link href="/generate">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 md:pt-32 pb-20 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 py-1.5 mb-8 text-sm text-gray-300">
          <Sparkles className="w-4 h-4 text-purple-400" />
          Built for finance & legal professionals
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Generate LinkedIn posts
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            that actually convert
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          AI-powered content engine with proven frameworks. Stanley, Daniel Korenblum, and Brandon Smithwrick — built into every post.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/generate">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-lg px-8 py-6 rounded-xl">
              Start Generating Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/calendar">
            <Button size="lg" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 text-lg px-8 py-6 rounded-xl">
              View Calendar
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-10 py-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-colors group">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Generate Posts</h3>
              <p className="text-gray-400">
                Three proven frameworks. One click. Posts that follow Stanley, Daniel Korenblum, or Brandon Smithwrick — with your voice baked in.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-colors group">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-pink-500/20 transition-colors">
                <Calendar className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Content Calendar</h3>
              <p className="text-gray-400">
                Plan your week in seconds. TOFU, MOFU, BOFU balance. Bulk input ideas, AI-powered improvements, and Notion sync.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-colors group">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors">
                <User className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Profile Optimizer</h3>
              <p className="text-gray-400">
                Your LinkedIn profile is your landing page. Get AI-powered suggestions for your headline, About section, and featured content.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">3</p>
            <p className="text-gray-500 mt-1">Proven Frameworks</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">5</p>
            <p className="text-gray-500 mt-1">Posts Per Week</p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">0</p>
            <p className="text-gray-500 mt-1">Hours Wasted</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stop overthinking. Start posting.
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            VoicePost handles the frameworks. You bring the ideas.
          </p>
          <Link href="/generate">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-lg px-10 py-6 rounded-xl">
              Generate Your First Post
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        VoicePost — LinkedIn Content Engine for Enterprise AI
      </footer>
    </main>
  );
}
