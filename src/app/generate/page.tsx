'use client';
import { useState } from 'react';

const frameworks = [
  {
    id: 'brandon',
    name: 'Brandon Smithwrick',
    description: '3-bucket strategy: 40% Growth, 40% Authority, 20% Conversion',
    bestFor: 'Building audience and driving inbound leads',
  },
  {
    id: 'stanley',
    name: 'Stanley',
    description: '8-step growth framework with weekly TOFU/MOFU/BOFU mix',
    bestFor: 'Consistent growth and audience building',
  },
  {
    id: 'daniel',
    name: 'Daniel Korenblum',
    description: '7-step inbound: Hook → Resonance → Problem → Consequence → Evidence → Agitation → CTA',
    bestFor: 'Direct lead generation and conversions',
  },
];

export default function GeneratePage() {
  const [framework, setFramework] = useState('stanley');
  const [topic, setTopic] = useState('');
  const [bucket, setBucket] = useState('growth');
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePost = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ framework, topic, bucket }),
    });
    const data = await res.json();
    setPost(data.post);
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Generate LinkedIn Post</h1>
      
      <div className="grid md:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <button
            key={fw.id}
            onClick={() => setFramework(fw.id)}
            className={`p-4 rounded-lg border-2 text-left transition ${
              framework === fw.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-300'
            }`}
          >
            <h3 className="font-semibold">{fw.name}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{fw.description}</p>
            <p className="text-xs text-zinc-500 mt-2">Best for: {fw.bestFor}</p>
          </button>
        ))}
      </div>

      {framework === 'brandon' && (
        <div className="flex gap-2">
          {['growth', 'authority', 'conversion'].map((b) => (
            <button
              key={b}
              onClick={() => setBucket(b)}
              className={`px-4 py-2 rounded-lg capitalize ${
                bucket === b ? 'bg-blue-600 text-white' : 'bg-zinc-200 dark:bg-zinc-800'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      )}

      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="What's your post about? (e.g., 'On-device AI for finance firms', 'Why compliance teams should love AI')"
        className="w-full p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900 min-h-[100px]"
      />

      <button
        onClick={generatePost}
        disabled={loading || !topic}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? 'Generating...' : 'Generate Post'}
      </button>

      {post && (
        <div className="p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <h2 className="font-semibold mb-4">Generated Post</h2>
          <pre className="whitespace-pre-wrap font-sans">{post}</pre>
          <button
            onClick={() => navigator.clipboard.writeText(post)}
            className="mt-4 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-700 transition"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
