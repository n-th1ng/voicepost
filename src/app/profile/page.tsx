"use client";

import { useState } from "react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Profile Optimizer</h1>
        <p className="text-slate-400 mb-8">
          Optimize your LinkedIn profile for conversions
        </p>

        <div className="p-6 bg-slate-800 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Profile Checklist</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Headline: Result-focused, not job title</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Banner: Social proof or value proposition</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Featured: CTA to business</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>About: Opens with audience problem</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Max 1-2 emojis</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
