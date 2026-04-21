"use client";

export default function CalendarPage() {
  const weekPlan = [
    { day: "Monday", type: "TOFU", content: "Broad industry insight" },
    { day: "Tuesday", type: "TOFU", content: "Trending topic take" },
    { day: "Wednesday", type: "MOFU", content: "Specific how-to or framework" },
    { day: "Thursday", type: "MOFU", content: "Case study or example" },
    { day: "Friday", type: "BOFU", content: "Product/service spotlight" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Content Calendar</h1>
        <p className="text-slate-400 mb-8">
          Weekly content strategy based on Stanley&apos;s framework
        </p>

        <div className="space-y-4">
          {weekPlan.map((item) => (
            <div key={item.day} className="p-4 bg-slate-800 rounded-xl">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{item.day}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    item.type === "TOFU"
                      ? "bg-blue-500/20 text-blue-400"
                      : item.type === "MOFU"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-purple-500/20 text-purple-400"
                  }`}
                >
                  {item.type}
                </span>
              </div>
              <p className="text-slate-400 mt-2">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-slate-800/50 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">Content Mix Rules</h2>
          <ul className="space-y-2 text-slate-300">
            <li>• 2x TOFU (Top of Funnel) - Broad, attracts new audience</li>
            <li>• 2x MOFU (Middle of Funnel) - Specific, builds authority</li>
            <li>• 1x BOFU (Bottom of Funnel) - Direct CTA, drives conversions</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
