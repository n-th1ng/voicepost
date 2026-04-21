export default function ProfilePage() {
  const checklist = [
    { item: "Headline: Result-focused, not job title", done: true },
    { item: "Banner: Social proof or value proposition", done: true },
    { item: "Featured: CTA to business", done: true },
    { item: "About: Opens with audience problem", done: true },
    { item: "Max 1-2 emojis", done: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Profile Optimizer</h1>
        <p className="text-slate-400 text-sm">
          Optimize your LinkedIn profile for conversions
        </p>
      </div>

      {/* Checklist */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="font-semibold mb-4">Profile Checklist</h2>
        <div className="space-y-3">
          {checklist.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">{item.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="font-semibold mb-4">Pro Tips</h2>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>Headline should focus on the outcome you deliver, not your job title</span>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>About section should open with your audience's problem, not your story</span>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>Featured section should have a clear CTA to your business</span>
          </div>
        </div>
      </div>
    </div>
  );
}
