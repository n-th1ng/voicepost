export default function CalendarPage() {
  const weekPlan = [
    { day: "Monday", type: "TOFU", content: "Broad industry insight", color: "blue" },
    { day: "Tuesday", type: "TOFU", content: "Trending topic take", color: "blue" },
    { day: "Wednesday", type: "MOFU", content: "Specific how-to or framework", color: "green" },
    { day: "Thursday", type: "MOFU", content: "Case study or example", color: "green" },
    { day: "Friday", type: "BOFU", content: "Product/service spotlight", color: "purple" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Content Calendar</h1>
        <p className="text-slate-400 text-sm">
          Weekly content strategy based on Stanley's framework
        </p>
      </div>

      {/* Week Plan */}
      <div className="space-y-3">
        {weekPlan.map((item) => (
          <div
            key={item.day}
            className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between"
          >
            <div>
              <div className="font-medium">{item.day}</div>
              <div className="text-sm text-slate-400">{item.content}</div>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">
              {item.type}
            </span>
          </div>
        ))}
      </div>

      {/* Content Mix */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="font-semibold mb-4">Content Mix Rules</h2>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex gap-3">
            <span className="text-blue-400">2x</span>
            <span>TOFU (Top of Funnel) - Broad, attracts new audience</span>
          </div>
          <div className="flex gap-3">
            <span className="text-green-400">2x</span>
            <span>MOFU (Middle of Funnel) - Specific, builds authority</span>
          </div>
          <div className="flex gap-3">
            <span className="text-purple-400">1x</span>
            <span>BOFU (Bottom of Funnel) - Direct CTA, drives conversions</span>
          </div>
        </div>
      </div>

      {/* Best Times */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="font-semibold mb-4">Best Posting Times (HKT)</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-lg font-medium">7:30-8:30</div>
            <div className="text-xs text-slate-400">Morning commute</div>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-lg font-medium">12:00-13:00</div>
            <div className="text-xs text-slate-400">Lunch break</div>
          </div>
          <div className="p-3 bg-slate-800 rounded-lg">
            <div className="text-lg font-medium">17:30-18:30</div>
            <div className="text-xs text-slate-400">End of day</div>
          </div>
        </div>
      </div>
    </div>
  );
}
