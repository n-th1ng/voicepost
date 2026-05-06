'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle } from 'lucide-react';

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
  const scoreColor = score >= 80 ? 'from-green-500 to-emerald-500' : score >= 50 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-rose-500';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile Optimizer</h1>
        <p className="text-zinc-400 mt-2">Stanley&apos;s 7-fix checklist for LinkedIn profiles</p>
      </div>

      {/* Score Card */}
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white">Profile Score</h2>
              <p className="text-zinc-400 text-sm">{checked.length} of {checklistItems.length} checks passed</p>
            </div>
            <div className={`text-5xl font-bold bg-gradient-to-r ${scoreColor} bg-clip-text text-transparent`}>
              {score}%
            </div>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-2">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${scoreColor} transition-all duration-500`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Checklist */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Optimization Checklist</CardTitle>
          <CardDescription>Complete all 7 fixes for maximum impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                checked.includes(item.id)
                  ? 'border-green-500/50 bg-green-500/5'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Checkbox
                checked={checked.includes(item.id)}
                onCheckedChange={() => toggle(item.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{item.label}</p>
                  {checked.includes(item.id) && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                </div>
                <p className="text-sm text-zinc-400 mt-1">{item.tip}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Testers */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Headline Tester</CardTitle>
            <CardDescription>Paste your headline to check</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Paste your headline..."
              className="bg-zinc-950 border-zinc-800 min-h-[80px] resize-none"
            />
            {headline && (
              <div className={`flex items-center gap-2 mt-3 text-sm ${
                headline.includes(' at ') || headline.includes('Founder at')
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}>
                {headline.includes(' at ') || headline.includes('Founder at') ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Focus on the result you deliver, not your title</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Good! This speaks to what you do for others</span>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">About Tester</CardTitle>
            <CardDescription>Paste your About section</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Paste your About section..."
              className="bg-zinc-950 border-zinc-800 min-h-[80px] resize-none"
            />
            {about && (
              <div className={`flex items-center gap-2 mt-3 text-sm ${
                about.toLowerCase().includes('i am') || about.toLowerCase().includes('i have')
                  ? 'text-yellow-400'
                  : 'text-green-400'
              }`}>
                {about.toLowerCase().includes('i am') || about.toLowerCase().includes('i have') ? (
                  <>
                    <AlertCircle className="w-4 h-4" />
                    <span>Start with their problem, not your story</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Good! This speaks to the audience first</span>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
