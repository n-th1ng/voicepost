'use client';
import { useState } from 'react';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const contentMix = {
  Monday: { type: 'TOFU', label: 'Broad topic, wide appeal', example: 'Industry take, universal lesson' },
  Tuesday: { type: 'MOFU', label: 'Specific audience problem', example: 'How-to guide, common mistakes' },
  Wednesday: { type: 'BOFU', label: 'Case study, proof, results', example: 'Client outcome, before/after' },
  Thursday: { type: 'TOFU', label: 'Broad topic, wide appeal', example: 'Contrarian view, trend analysis' },
  Friday: { type: 'MOFU', label: 'Specific audience problem', example: 'Tool breakdown, framework' },
};

const bestTimes = [
  { time: '7:30-8:30 AM', label: 'Morning commute', note: 'Best for CEOs' },
  { time: '12:00-1:00 PM', label: 'Lunch break', note: 'High engagement' },
  { time: '5:30-6:30 PM', label: 'End of workday', note: 'Good for B2B' },
];

export default function CalendarPage() {
  const [posts, setPosts] = useState<Record<string, { title: string; notes: string }>>({});

  const updatePost = (day: string, field: 'title' | 'notes', value: string) => {
    setPosts((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Weekly Content Calendar</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
          2x TOFU + 2x MOFU + 1x BOFU = balanced content that grows and converts
        </p>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Best Posting Times (HKT)</h3>
        <div className="grid grid-cols-3 gap-4 mt-3">
          {bestTimes.map((t) => (
            <div key={t.time} className="text-sm">
              <p className="font-medium">{t.time}</p>
              <p className="text-blue-700 dark:text-blue-300">{t.label}</p>
              <p className="text-blue-600 dark:text-blue-400 text-xs">{t.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {weekDays.map((day) => {
          const mix = contentMix[day as keyof typeof contentMix];
          return (
            <div
              key={day}
              className={`p-4 rounded-lg border ${
                mix.type === 'TOFU'
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950'
                  : mix.type === 'MOFU'
                  ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950'
                  : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{day}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  mix.type === 'TOFU'
                    ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200'
                    : mix.type === 'MOFU'
                    ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                    : 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200'
                }`}>
                  {mix.type}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{mix.label}</p>
              <p className="text-xs text-zinc-500 mb-3">Example: {mix.example}</p>
              <input
                type="text"
                value={posts[day]?.title || ''}
                onChange={(e) => updatePost(day, 'title', e.target.value)}
                placeholder="Post title / topic..."
                className="w-full p-2 border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-sm"
              />
              <textarea
                value={posts[day]?.notes || ''}
                onChange={(e) => updatePost(day, 'notes', e.target.value)}
                placeholder="Notes, hooks, key points..."
                className="w-full p-2 border border-zinc-200 dark:border-zinc-700 rounded bg-white dark:bg-zinc-900 text-sm mt-2 min-h-[60px]"
              />
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg">
        <h3 className="font-semibold mb-2">The Golden Rule</h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Never post 5x convert. Never post 0x convert. Balance is the strategy.
        </p>
      </div>
    </div>
  );
}
