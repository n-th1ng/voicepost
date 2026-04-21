import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">LinkedIn Content Engine</h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Generate scroll-stopping posts for finance & legal executives. 
          Built on proven frameworks from Stanley, Brandon, and Daniel.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/generate"
          className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500/50 hover:bg-slate-900/50 transition-all"
        >
          <div className="text-2xl mb-3">✍️</div>
          <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors">
            Generate Post
          </h2>
          <p className="text-sm text-slate-400">
            Create AI-powered LinkedIn posts with hooks and image prompts
          </p>
        </Link>

        <Link
          href="/history"
          className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-purple-500/50 hover:bg-slate-900/50 transition-all"
        >
          <div className="text-2xl mb-3">📚</div>
          <h2 className="text-lg font-semibold mb-1 group-hover:text-purple-400 transition-colors">
            Post History
          </h2>
          <p className="text-sm text-slate-400">
            View and manage your previously generated posts
          </p>
        </Link>

        <Link
          href="/calendar"
          className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-green-500/50 hover:bg-slate-900/50 transition-all"
        >
          <div className="text-2xl mb-3">📅</div>
          <h2 className="text-lg font-semibold mb-1 group-hover:text-green-400 transition-colors">
            Content Calendar
          </h2>
          <p className="text-sm text-slate-400">
            Plan your weekly content strategy
          </p>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Optimal Length", value: "1,300-1,400", unit: "chars" },
          { label: "Best Image Type", value: "Multi-image", unit: "6.6% eng." },
          { label: "Hook Formulas", value: "5", unit: "patterns" },
          { label: "Frameworks", value: "3", unit: "systems" },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg text-center">
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.unit}</div>
            <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>Start with a hook that creates tension or promises a clear outcome</span>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>Always include an image - multi-image posts get 6.6% engagement</span>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>Track saves and DMs, not just likes</span>
          </div>
          <div className="flex gap-3">
            <span className="text-blue-400">→</span>
            <span>Build 200-300 connections before posting consistently</span>
          </div>
        </div>
      </div>
    </div>
  );
}
