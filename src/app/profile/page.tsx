'use client';
import { useState } from 'react';

const checklistItems = [
  { id: 'headline', label: 'Headline = result, not job title', tip: 'Say who you help, how you help them, what they get' },
  { id: 'specific', label: 'Specific niche defined', tip: 'One person, one problem, one promise' },
  { id: 'banner', label: 'Banner has social proof', tip: 'Treat it like a billboard, not a background' },
  { id: 'featured', label: 'Featured = lead magnet or CTA', tip: 'Not pinned posts — use a link that captures leads' },
  { id: 'emojis', label: 'Max 1-2 emojis', tip: 'Use to direct attention, not decorate' },
  { id: 'about', label: 'About opens with audience problem', tip: 'Not your resume — their pain point' },
  { id: 'cta', label: 'One clear CTA', tip: 'One link, one ask. Make it obvious.' },
];

export default function ProfilePage() {
  const [checked, setChecked] = useState<string[]>([]);
  const [headline, setHeadline] = useState('');
  const [about, setAbout] = useState('');

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const score = Math.round((checked.length / checklistItems.length) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Profile Optimizer</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          Stanley&apos;s 7-fix checklist for LinkedIn profiles
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Profile Score</h2>
          <span className={`text-3xl font-bold ${score >= 80 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
            {score}%
          </span>
        </div>
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all ${score >= 80 ? 'bg-green-600' : score >= 50 ? 'bg-yellow-600' : 'bg-red-600'}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {checklistItems.map((item) => (
          <label
            key={item.id}
            className={`flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition ${
              checked.includes(item.id)
                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            <input
              type="checkbox"
              checked={checked.includes(item.id)}
              onChange={() => toggle(item.id)}
              className="mt-1 w-5 h-5 rounded"
            />
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.tip}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Headline Tester</h3>
          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="Paste your headline..."
            className="w-full p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 min-h-[80px]"
          />
          {headline && (
            <p className={`text-sm mt-2 ${headline.includes(' at ') || headline.includes('Founder at') ? 'text-red-600' : 'text-green-600'}`}>
              {headline.includes(' at ') || headline.includes('Founder at')
                ? 'Tip: Focus on the result you deliver, not your title'
                : 'Good: This speaks to what you do for others'}
            </p>
          )}
        </div>
        <div>
          <h3 className="font-semibold mb-2">About Tester</h3>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Paste your About section..."
            className="w-full p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 min-h-[80px]"
          />
          {about && (
            <p className={`text-sm mt-2 ${about.toLowerCase().includes('i am') || about.toLowerCase().includes('i have') ? 'text-yellow-600' : 'text-green-600'}`}>
              {about.toLowerCase().includes('i am') || about.toLowerCase().includes('i have')
                ? 'Tip: Start with their problem, not your story'
                : 'Good: This speaks to the audience first'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
